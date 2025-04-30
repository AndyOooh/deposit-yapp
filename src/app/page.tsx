"use client";

import { Container, Heading, Text, Flex, Callout, Card, Button, Link } from "@radix-ui/themes";
import { FiInfo } from "react-icons/fi";
import { useEffect, useState } from "react";
import { UAParser } from "ua-parser-js";
import { Source, SOURCE_HEADERS, SOURCES } from "@/constants/sources";
import { truncateAddress, typedKeys } from "@/utils/typeUtils";
import { SourceCard } from "@/components/SourceCard";
import { sdk } from "@/lib/sdk";
import { UserContext } from "@yodlpay/yapp-sdk/types";
import { CodeCopy } from "@/components/CodeCopy";

export default function Home() {
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [userContext, setUserContext] = useState<UserContext | null>(null);

  useEffect(() => {
    const getUserContext = async () => {
      try {
        const userContext = await sdk.getUserContext();
        setUserContext(userContext);
      } catch (error) {
        console.error("Error getting user context:", error);
      }
    };
    getUserContext();

    const parser = new UAParser();
    setIsMobile(parser.getDevice().type === "mobile");
  }, []);

  const ensOrAddress = userContext?.primaryEnsName || userContext?.address;

  const getLink = (source: Source) => {
    const link = isMobile
      ? typeof source.link.mobile === "function"
        ? source.link.mobile(ensOrAddress || "")
        : source.link.mobile
      : source.link.web;
    return link;
  };

  return (
    <Container size='2' p='6'>
      <Flex direction='column' gap='6' align='center' minHeight='90vh'>
        {error ? (
          <Text color='red'>{error}</Text>
        ) : (
          <>
            <Flex direction='column' gap='2' align='center'>
              <Heading>Fund your account</Heading>
              {userContext ? (
                <Heading size='2'>
                  Transfer assets to{" "}
                  <Text size='4' color='iris' className='fontFamily-mono'>
                    {userContext.primaryEnsName || truncateAddress(userContext.address)}
                  </Text>
                </Heading>
              ) : (
                <Flex justify='center' align='center' px='4' className='bg-transparent'>
                  <Callout.Root size='2'>
                    <Callout.Icon>
                      <FiInfo />
                    </Callout.Icon>
                    <Callout.Text>
                      This yapp requires an ENS or wallet address. Please connect your wallet in the Yodl app and come back.
                    </Callout.Text>
                  </Callout.Root>
                </Flex>
              )}
            </Flex>

            <Flex direction='column' gap='4' width='100%' maxWidth='400px'>
              {/* {typedKeys(SOURCE_HEADERS).map(sourceType => (
                <SourceCard
                  key={sourceType}
                  sourceType={sourceType}
                  isMobile={isMobile}
                  ensOrAddress={userContext?.primaryEnsName || userContext?.address}
                />
              ))} */}

              <Card size='2'>
                <Heading size='3' mb='2' className='uppercase'>
                  Easy wallet transfer
                </Heading>
                <Text as='p' size='2' color='gray' mb='3'>
                  In-app transfer through yodl with one of the following wallets:
                </Text>
                <Flex direction='column' gap='4'>
                  {SOURCES.wallet.map(wallet => (
                    <Button asChild disabled={!ensOrAddress} variant='outline' key={wallet.id}>
                      <Link href={getLink(wallet)} target='_blank'>
                        {/* {isMobile ? "Open App" : "Connect"} */}
                        <Flex align='center' gap='2' width='100%' justify='start'>
                          <img src={wallet.icon} alt={`${wallet.name} icon`} width={24} height={24} />
                          <Text weight='bold'>{wallet.name}</Text>
                        </Flex>
                      </Link>
                    </Button>
                  ))}

                  {/* {sourcesForType.map(source => (
                    <SourceItem key={source.id} source={source} isMobile={isMobile} ensOrAddress={ensOrAddress!} />
                  ))} */}
                </Flex>
              </Card>

              <Card size='2'>
                <Heading size='3' mb='2' className='uppercase'>
                  Manual transfer
                </Heading>
                <Text as='p' size='2' color='gray' mb='3'>
                  If your wallet is not in the above list:
                  <ul>
                    <li>- Copy your address below</li>
                    <li>- Open your wallet app or browser extension</li>
                    <li>- Transfer funds to yourself</li>
                  </ul>
                </Text>
                {userContext?.address ? (
                  <CodeCopy text={userContext?.address} truncate={true} />
                ) : (
                  <Text>No address found, please connect your wallet in the Yodl app and come back</Text>
                )}
              </Card>
            </Flex>
          </>
        )}
      </Flex>
    </Container>
  );
}

export const dynamic = "force-static";
