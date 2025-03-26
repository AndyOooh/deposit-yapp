"use client";

import { Container, Heading, Text, Flex, Callout } from "@radix-ui/themes";
import { FiInfo } from "react-icons/fi";
import { useEffect, useState } from "react";
import { UAParser } from "ua-parser-js";
import { SOURCE_HEADERS } from "@/constants/sources";
import { truncateAddress, typedKeys } from "@/utils/typeUtils";
import { SourceCard } from "@/components/SourceCard";
import { sdk } from "@/lib/sdk";
import { UserContext } from "@yodlpay/yapp-sdk/types";

export default function Home() {
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [userContext, setUserContext] = useState<UserContext | null>(null);

  useEffect(() => {
    const getUserContext = async () => {
      try {
        const userContext = await sdk.getUserContext();
        setUserContext(userContext);
        console.log("🚀 userContext:", userContext);
      } catch (error) {
        console.error("Error getting user context:", error);
      }
    };
    getUserContext();

    const parser = new UAParser();
    setIsMobile(parser.getDevice().type === "mobile");
  }, []);

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
                      This yapp requires an ENS or wallet address. Please connect your wallet in the yodl app and come back.
                    </Callout.Text>
                  </Callout.Root>
                </Flex>
              )}
            </Flex>

            <Flex direction='column' gap='4' width='100%' maxWidth='400px'>
              {typedKeys(SOURCE_HEADERS).map(sourceType => (
                <SourceCard
                  key={sourceType}
                  sourceType={sourceType}
                  isMobile={isMobile}
                  ensOrAddress={userContext?.primaryEnsName || userContext?.address}
                />
              ))}
            </Flex>
          </>
        )}
      </Flex>
    </Container>
  );
}

export const dynamic = "force-static";
