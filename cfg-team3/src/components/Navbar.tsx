import {
  Box,
  Flex,
  Text,
  IconButton,
  Stack,
  Collapse,
  Icon,
  Image,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import Router from "next/router";
import { useReader } from "@/features/reader/ReaderContext";
import { MdOutlineSpatialAudio } from "react-icons/md";

export default function WithSubnavigation() {
  const { isOpen, onToggle } = useDisclosure();
  const { isReaderMode, setReaderMode } = useReader();

  return (
    <Box className="text-3xl">
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: 10 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? (
                <CloseIcon w={12} h={12} />
              ) : (
                <HamburgerIcon w={12} h={12} />
              )
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
          <IconButton
            ml="2rem"
            onClick={() => {
              setReaderMode((prev) => !prev);
            }}
            icon={
              <Icon
                as={MdOutlineSpatialAudio}
                w={12}
                h={12}
                color={isReaderMode ? "green.500" : "gray.500"}
              />
            }
            variant={"ghost"}
            aria-label={"Toggle Reader Mode"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Image
            src="/fortitude_culina_logo_chef.jpeg"
            alt="Fortitude Image"
            className="w-40"
            onClick={() => {
              Router.push("/");
            }}
            cursor="pointer"
          />
          <Flex
            display={{ base: "none", md: "flex" }}
            ml={10}
            className="text-3xl self-center"
            justifyContent="space-between"
            width="full"
          >
            <Flex>
              <DesktopNav />
            </Flex>
            <IconButton
              mr="2rem"
              onClick={() => {
                setReaderMode((prev) => !prev);
              }}
              icon={
                <Icon
                  as={MdOutlineSpatialAudio}
                  w={12}
                  h={12}
                  color={isReaderMode ? "green.500" : "gray.500"}
                />
              }
              variant={"ghost"}
              aria-label={"Toggle Reader Mode"}
            />
          </Flex>
        </Flex>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Box
                as="a"
                p={2}
                href={navItem.href ?? "#"}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </Box>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Box
      as="a"
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("pink.50", "gray.900") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "pink.400" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"pink.400"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Box>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Box
        py={2}
        as="a"
        href={href ?? "#"}
        justifyContent="space-between"
        alignItems="center"
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Box>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Box as="a" key={child.label} py={2} href={child.href}>
                {child.label}
              </Box>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Recipes",
    href: "/",
  },
  {
    label: "Inventory",
    children: [
      {
        label: "Inventory",
        subLabel: "View your inventory",
        href: "/inventory",
      },
    ],
  },
  {
    label: "Chat",
    children: [
      {
        label: "Staff",
        subLabel: "Chat with your customers",
        href: "/chat",
      },
      {
        label: "Public",
        subLabel: "Chat with your favorite chefs",
        href: "/chat",
      },
    ],
  },
  {
    label: "Admin",
    children: [
      {
        label: "Orders",
        subLabel: "Add orders here",
        href: "/orders",
      },
      {
        label: "Shifts",
        subLabel: "Manage shifts",
        href: "/shifts",
      },
      {
        label: "Calculator",
        subLabel: "Calculating your bulk orders",
        href: "/calculator",
      },
    ],
  },
];
