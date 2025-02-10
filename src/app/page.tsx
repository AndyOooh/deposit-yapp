"use client";

import { Container, Heading, Text, Card, Flex, Box, Button } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import { UAParser } from "ua-parser-js";
import { checkWalletAvailability } from "./utils/walletDetection";
import { ALL_FUNDING_CONFIGS, CATEGORY_DESCRIPTIONS, FundingConfig } from "./constants";

export default function Home() {
  const [ensName, setEnsName] = useState<string>("your-ens.eth");
  const [isVerifying, setIsVerifying] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedMethod, setExpandedMethod] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  console.log("🚀  isMobile:", isMobile);

  useEffect(() => {
    const decodeToken = () => {
      const params = new URLSearchParams(window.location.search);
      const jwtFromParams = params.get("jwt");

      if (!jwtFromParams) {
        setIsVerifying(false);
        return;
      }
      try {
        const payload = JSON.parse(atob(jwtFromParams));
        setEnsName(payload.ensName);
      } catch (e) {
        setError("Invalid token format");
      } finally {
        setIsVerifying(false);
      }
    };

    decodeToken();

    const parser = new UAParser();
    setIsMobile(parser.getDevice().type === "mobile");
  }, []);

  const availableFundingConfigs = ALL_FUNDING_CONFIGS.filter(config => (isMobile ? config.supportsMobile : config.supportsExtension));

  const handleMethodDeepLink = async (method: FundingConfig) => {
    const mobileDeepLink = typeof method.deepLink.mobile === "function" ? method.deepLink.mobile(ensName) : method.deepLink.mobile;
    alert(mobileDeepLink);
    console.log('🚀  mobileDeepLink:', mobileDeepLink);

    const deepLink = isMobile ? mobileDeepLink : method.deepLink.web;
    if (!deepLink) return;

    if (isMobile) {
      window.location.href = deepLink;
    } else if (method.category === "wallet" && method.supportsExtension) {
      const isAvailable = await checkWalletAvailability(deepLink);
      if (!isAvailable) {
        alert(`Please install ${method.name} to continue`);
      }
    } else {
      window.open(deepLink, "_blank");
    }
  };

  return (
    <Container size='2' p='6'>
      <Flex direction='column' gap='6' align='center' style={{ minHeight: "90vh" }}>
        <Box>
          <Heading align='center' mb='2'>
            Fund your account
          </Heading>
          <Heading size='1' align='center' mb='2'>
            Transfer assets to{" "}
            <Text size='3' color='iris' className='fontFamily-mono'>
              {ensName}
            </Text>
          </Heading>
        </Box>

        <Flex direction='column' gap='4' style={{ width: "100%", maxWidth: "400px" }}>
          {Object.keys(CATEGORY_DESCRIPTIONS).map(category => {
            const configsInCategory = availableFundingConfigs.filter(config => config.category === category);

            if (configsInCategory.length === 0) return null;

            return (
              <Card key={category} size='2'>
                <Heading size='3' mb='2' style={{ textTransform: "capitalize" }}>
                  {category}s
                </Heading>
                <Text as='p' size='2' color='gray' mb='3'>
                  {CATEGORY_DESCRIPTIONS[category] || `Transfer from ${category}.`}
                </Text>
                <Flex direction='column' gap='4'>
                  {configsInCategory.map(method => (
                    <Box key={method.id}>
                      <Flex
                        direction='column'
                        gap='2'
                        onClick={() => setExpandedMethod(expandedMethod === method.id ? null : method.id)}
                        style={{ cursor: "pointer", padding: "2px" }}>
                        <Flex align='center' gap='2'>
                          {expandedMethod === method.id ? <FiChevronDown /> : <FiChevronRight />}
                          <img src={method.icon} alt={`${method.name} icon`} width={24} height={24} style={{ width: "24px", height: "24px" }} />
                          <Text weight='bold'>{method.name}</Text>
                        </Flex>

                        {expandedMethod === method.id && (
                          <Flex direction='column' gap='4' pt='2'>
                            <Text size='2' color='gray'>
                              {method.description}
                            </Text>
                            <Flex direction='column' gap='2'>
                              <Button onClick={() => handleMethodDeepLink(method)} size='2'>
                                {isMobile ? "Open App" : "Connect"}
                              </Button>
                            </Flex>
                          </Flex>
                        )}
                      </Flex>
                    </Box>
                  ))}
                </Flex>
              </Card>
            );
          })}
        </Flex>
      </Flex>
    </Container>
  );
}

export const dynamic = "force-static";
