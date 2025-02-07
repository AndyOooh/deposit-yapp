import { Box, Flex, Heading } from "@radix-ui/themes";

export function Header() {
  return (
    <Box>
      <header>
        <Flex
          px='2'
          py='3'
          justify='between'
          align='center'
          // className={cn("shadow-sm")}
          //   style={{ background: "var(--accent-0" }}
        >
          <Heading>TG Bot</Heading>
          <Heading>Center</Heading>
          <Heading>Right</Heading>
        </Flex>
      </header>
    </Box>
  );
}
