"use client";

import { Container, Heading, Text, Button, Card, Flex, Box } from "@radix-ui/themes";
import { useState, useEffect } from "react";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import { Command, getCommands } from "./commands";
import { CopyableCommand } from "./components/CopyableCommand";
import { UAParser } from "ua-parser-js";

export default function Home() {
  const [ensName, setEnsName] = useState<string>("your-ens.eth");
  const [isVerifying, setIsVerifying] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasStartedBot, setHasStartedBot] = useState(false);
  const [expandedCommand, setExpandedCommand] = useState<string | null>(null);
  const botUsername = "yodl_tg_bot";

  const parser = new UAParser();
  const isMobile = parser.getDevice().type === "mobile";

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
  }, []);

  const handleStartBot = () => {
    const telegramUrl = isMobile ? `tg://resolve?domain=${botUsername}` : `https://t.me/${botUsername}`;
    window.open(telegramUrl, "_blank");
    setHasStartedBot(true);
  };

  if (isVerifying) {
    return (
      <Container size='2' p='6'>
        <Flex direction='column' gap='6' align='center' style={{ minHeight: "90vh" }}>
          <Text>Verifying...</Text>
        </Flex>
      </Container>
    );
  }

  if (error) {
    return (
      <Container size='2' p='6'>
        <Flex direction='column' gap='6' align='center' style={{ minHeight: "90vh" }}>
          <Text color='red'>Error: {error}</Text>
        </Flex>
      </Container>
    );
  }

  return (
    <Container size='2' p='6'>
      <Flex direction='column' gap='6' align='center' style={{ minHeight: "90vh" }}>
        <Box>
          <Heading align='center' mb='2'>
            Yodl Deposit
          </Heading>
          <Heading size='1' align='center' mb='2'>
            Fund your Yodl wallet with your preferred token
          </Heading>
        </Box>

        <Flex direction='column' align='center' gap='2' width='100%'>
          <Text color='gray' size='3'>
            Get Started
          </Text>

          <Card size='3' style={{ width: "100%", maxWidth: "400px" }}>
            <Flex direction='column' gap='4'>
              <Flex direction='column' gap='2'>
                <Text weight='bold'>Step 1: Start the Bot</Text>
                <Text color='gray' size='2'>
                  First, open the chat and click the Start button.
                </Text>
                <Button onClick={handleStartBot}>{hasStartedBot ? "Bot Started" : "Open Chat"}</Button>
              </Flex>

              <Flex direction='column' gap='2'>
                <Text weight='bold'>Step 2: Subscribe to your ENS</Text>
                <Text color='gray' size='2'>
                  Paste this command into the chat and send it.
                </Text>
                <CopyableCommand command={`/subscribe ${ensName}`} />
              </Flex>
            </Flex>
          </Card>
        </Flex>

        <Flex direction='column' align='center' gap='2' width='100%'>
          <Text color='gray' size='3'>
            Available Commands
          </Text>

          <Card size='2' style={{ width: "100%", maxWidth: "400px" }}>
            <Flex direction='column' gap='4'>
              {getCommands(ensName).map((cmd: Command, index: number) => (
                <Box key={index}>
                  <Flex
                    direction='column'
                    gap='2'
                    onClick={() => setExpandedCommand(expandedCommand === cmd.command ? null : cmd.command)}
                    style={{ cursor: "pointer", padding: "8px" }}>
                    <Flex align='center' gap='2'>
                      {expandedCommand === cmd.command ? <FiChevronDown /> : <FiChevronRight />}
                      <Text style={{ fontFamily: "monospace" }} weight='bold'>
                        {cmd.command}
                      </Text>
                    </Flex>
                    {expandedCommand === cmd.command && (
                      <>
                        <Text as='p' size='2' color='gray' className='whitespace-pre-line'>
                          {cmd.description}
                        </Text>
                        {cmd.examples && (
                          <Flex direction='column' gap='1'>
                            <Text size='2' color='gray'>
                              Examples:
                            </Text>
                            {cmd.examples.map((example, i) => (
                              <CopyableCommand key={i} command={example} size='1' />
                            ))}
                          </Flex>
                        )}
                      </>
                    )}
                  </Flex>
                </Box>
              ))}
            </Flex>
          </Card>
        </Flex>
      </Flex>
    </Container>
  );
}

export const dynamic = "force-static";
