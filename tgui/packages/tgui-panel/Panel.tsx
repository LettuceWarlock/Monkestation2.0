/**
 * @file
 * @copyright 2020 Aleksej Komarov
 * @license MIT
 */

import { Button, Section, Stack } from 'tgui/components';
import { Pane } from 'tgui/layouts';
import { NowPlayingWidget, useAudio } from './audio';
import { ChatPanel, ChatTabs } from './chat';
import { useGame } from './game';
import { Notifications } from './Notifications';
import { PingIndicator } from './ping';
import { ReconnectButton } from './reconnect';
import { SettingsPanel, useSettings } from './settings';

export const Panel = (props, context) => {
  const audio = useAudio(context);
  const settings = useSettings(context);
  const game = useGame(context);
  if (process.env.NODE_ENV !== 'production') {
    const { useDebug, KitchenSink } = require('tgui/debug');
    const debug = useDebug(context);
    if (debug.kitchenSink) {
      return <KitchenSink panel />;
    }
  }

  return (
    <Pane theme={settings.theme}>
      <Stack fill vertical>
        <Stack.Item>
          <Section fitted>
            <Stack mr={1} align="center">
              <Stack.Item grow overflowX="auto">
                <ChatTabs />
              </Stack.Item>
              <Stack.Item>
                <PingIndicator />
              </Stack.Item>
              <Stack.Item>
                <Button
                  color="grey"
                  selected={audio.visible}
                  icon="music"
                  tooltip="Music player"
                  tooltipPosition="bottom-start"
                  onClick={() => audio.toggle()}
                />
              </Stack.Item>
              <Stack.Item>
                <Button
                  icon={settings.visible ? 'times' : 'cog'}
                  selected={settings.visible}
                  tooltip={
                    settings.visible ? 'Close settings' : 'Open settings'
                  }
                  tooltipPosition="bottom-start"
                  onClick={() => settings.toggle()}
                />
              </Stack.Item>
            </Stack>
          </Section>
        </Stack.Item>
        {audio.visible && (
          <Stack.Item>
            <Section>
              <NowPlayingWidget />
            </Section>
          </Stack.Item>
        )}
        {settings.visible && (
          <Stack.Item>
            <SettingsPanel />
          </Stack.Item>
        )}
        <Stack.Item grow>
          <Section fill fitted position="relative">
            <Pane.Content scrollable>
              <ChatPanel lineHeight={settings.lineHeight} />
            </Pane.Content>
            <Notifications>
              {game.connectionLostAt && (
                <Notifications.Item rightSlot={<ReconnectButton />}>
                  You are either AFK, experiencing lag or the connection has
                  closed.
                </Notifications.Item>
              )}
              {game.roundRestartedAt && (
                <Notifications.Item>
                  The connection has been closed because the server is
                  restarting. Please wait while you automatically reconnect.
                </Notifications.Item>
              )}
            </Notifications>
          </Section>
        </Stack.Item>
      </Stack>
    </Pane>
  );
};
