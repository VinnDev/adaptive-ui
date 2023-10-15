import React, { useState } from "react";
import axios from "axios";
import usePartySocket from "partysocket/react";
import {
  Badge,
  Center,
  Container,
  Group,
  Stack,
  Image,
  SegmentedControl,
  Fieldset,
  Button,
} from "@mantine/core";
import {
  IconArcheryArrow,
  IconArrowBadgeDownFilled,
  IconArrowBadgeLeftFilled,
  IconArrowBadgeRightFilled,
  IconArrowBadgeUpFilled,
  IconHandClick,
  IconHourglass,
  IconMap,
  IconMenu2,
  IconRefresh,
} from "@tabler/icons-react";
import classes from "./DoomGUI.module.css";

interface GameButtonProps {
  count: number;
  text: string;
  icon: React.ReactNode;
  action: "reset" | "input";
  input?: string;
  repeatable?: boolean;
}

const IMAGE_URL =
  "https://doom-api.plexidev.org/frame/lorenplexidev/?type=.gif";
const INPUT_URL = "https://doom-api.plexidev.org/input/lorenplexidev";
const HOST =
  process.env.NODE_ENV === "development"
    ? "localhost:1999"
    : "doom-party.lorencerri.partykit.dev";
const REPEAT_OPTIONS = [
  { label: "1x", value: "1" },
  { label: "5x", value: "5" },
  { label: "10x", value: "10" },
  { label: "25x", value: "25" },
  { label: "50x", value: "50" },
];

const DoomGUI: React.FC = () => {
  const [connected, setConnected] = useState(false);
  const [connectionCount, setConnectionCount] = useState(0);
  const [seed, setSeed] = useState(Math.random());
  const [repeat, setRepeat] = useState("10");

  const ws = usePartySocket({
    host: HOST,
    room: "doom",
    onMessage(e) {
      const data = JSON.parse(e.data);

      switch (data.action) {
        case "connectionCountUpdate":
          setConnectionCount(data.connectionCount);
          break;
        case "screenUpdate":
          setSeed(Math.random());
          break;
      }

      setConnected(true);
    },
  });

  const GameButton: React.FC<GameButtonProps> = ({
    count,
    text,
    icon,
    action,
    input,
    repeatable = true,
  }) => {
    return (
      <Button
        leftSection={count === 0 ? " 0 " : String(count)}
        rightSection={icon}
        radius="md"
        classNames={classes}
        onClick={async () => {
          if (action === "reset" || !input) await axios(`${INPUT_URL}/reset`);
          else {
            let uri = `${INPUT_URL}/append?keys=`;
            if (repeatable) uri += input.repeat(Number(repeat));
            else uri += input;
            await axios(uri);
          }

          setSeed(Math.random());
          ws.send(JSON.stringify({ action: "screenUpdate" }));
        }}
      >
        {text}
      </Button>
    );
  };

  return (
    <Container>
      <Center>
        <Stack>
          <Group>
            {connected ? (
              <Badge variant="dot" color="green">
                Connections: {connectionCount}
              </Badge>
            ) : (
              <Badge variant="dot" color="yellow">
                Connecting...
              </Badge>
            )}
            <Badge variant="dot">TODO: Voting System</Badge>
            <Badge variant="dot">TODO: Lobby System</Badge>
            <Badge variant="dot">TODO: Fix Frame Buffer</Badge>
          </Group>
          <Image src={`${IMAGE_URL}&${seed}`} />
          <SegmentedControl
            value={repeat}
            onChange={setRepeat}
            data={REPEAT_OPTIONS}
          />
          <Fieldset legend="Meta">
            <Group>
              <GameButton
                count={0}
                text="Reset Game"
                action="input"
                icon={<IconRefresh width={18} />}
              />
              <GameButton
                count={0}
                text="Idle"
                action="input"
                icon={<IconHourglass width={18} />}
                input=",,"
              />
            </Group>
          </Fieldset>
          <Fieldset legend="Movement">
            <Group>
              <GameButton
                count={0}
                text="Forward"
                action="input"
                icon={<IconArrowBadgeUpFilled width={18} />}
                input="u,"
              />
              <GameButton
                count={0}
                text="Left"
                action="input"
                icon={<IconArrowBadgeLeftFilled width={18} />}
                input="l,"
              />
              <GameButton
                count={0}
                text="Right"
                action="input"
                icon={<IconArrowBadgeRightFilled width={18} />}
                input="r,"
              />
              <GameButton
                count={0}
                text="Backward"
                action="input"
                icon={<IconArrowBadgeDownFilled width={18} />}
                input="d,"
              />
            </Group>
          </Fieldset>
          <Fieldset legend="Actions">
            <Group>
              <GameButton
                count={0}
                text="Shoot"
                action="input"
                icon={<IconArcheryArrow width={18} />}
                input="f,f,"
              />
              <GameButton
                count={0}
                text="Interact"
                action="input"
                icon={<IconHandClick width={18} />}
                input="p,"
              />
              <GameButton
                count={0}
                text="Toggle Map"
                action="input"
                icon={<IconMap width={18} />}
                input="t,"
                repeatable={false}
              />
              <GameButton
                count={0}
                text="Toggle Menu"
                action="input"
                icon={<IconMenu2 width={18} />}
                input="x,"
                repeatable={false}
              />
            </Group>
          </Fieldset>
        </Stack>
      </Center>
    </Container>
  );
};

export default DoomGUI;
