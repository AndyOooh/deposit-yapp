import { Flex, Code, Button } from "@radix-ui/themes";
import { FiCopy } from "react-icons/fi";

export type CopyableCommandProps = {
  command: string;
  size?: "1" | "2" | "3";
};

export const CopyableCommand = ({ command, size = "2" }: CopyableCommandProps) => {
  return (
    <Flex width='100%' justify='between' px='4' py={size} align='center' className='bg-gray-800 rounded-md'>
      <Code size={size}>{command}</Code>
      <Button
        variant='soft'
        size='1'
        onClick={e => {
          e.stopPropagation();
          navigator.clipboard.writeText(command);
        }}>
        <FiCopy />
      </Button>
    </Flex>
  );
};
