import { useState } from "react";
import { Box, Flex, Text, Button, Link } from "@radix-ui/themes";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import { Source } from "@/constants/sources";

type SourceItemProps = {
  source: Source;
  isMobile: boolean;
  ensOrAddress: string;
};

export const SourceItem = ({ source, isMobile, ensOrAddress }: SourceItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // const handleClickLink = (source: Source) => {
  //   const link = isMobile ? (typeof source.link.mobile === "function" ? source.link.mobile(ensOrAddress) : source.link.mobile) : source.link.web;
  //   if (!link) return;
  //   return isMobile ? (window.location.href = link) : window.open(link, "_blank");
  // };

  const getLink = (source: Source) => {
    return isMobile ? (typeof source.link.mobile === "function" ? source.link.mobile(ensOrAddress) : source.link.mobile) : source.link.web;
  };

  //   <Button size='1' asChild>
  //   <Link href={isMobile ? REVOLUT_UNIVERSAL_LINK_MOBILE : REVOLUT_UNIVERSAL_LINK} target='_blank'>
  //     Open App
  //   </Link>
  // </Button>

  return (
    <Box>
      <Flex direction='column' gap='2' p='2' className='cursor-pointer' onClick={() => setIsExpanded(!isExpanded)}>
        <Flex align='center' gap='2'>
          {isExpanded ? <FiChevronDown /> : <FiChevronRight />}
          <img src={source.icon} alt={`${source.name} icon`} width={24} height={24} />
          <Text weight='bold'>{source.name}</Text>
        </Flex>

        {isExpanded && (
          <Flex direction='column' gap='4' pt='2'>
            <Text size='2' color='gray'>
              {source.description}
            </Text>
            <Link href={getLink(source)} target='_blank'>
              {isMobile ? "Open App" : "Connect"}
            </Link>
          </Flex>
        )}
      </Flex>
    </Box>
  );
};
