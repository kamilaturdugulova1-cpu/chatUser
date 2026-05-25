import { useState, useEffect, useRef } from 'react';
import { Container, Typography, CssBaseline, Box } from '@mui/material';
import { MessageForm } from './components/MessageForm';
import { MessageList } from './components/MessageList';
import type { UsersMessage } from './types';

const API_URL = 'http://146.185.154.90:8000/messages';

export const App = () => {
    const [messages, setMessages] = useState<UsersMessage[]>([]);
    const lastMessageDatetimeRef = useRef<string>('');
    const timerIdentifierRef = useRef<number | null>(null);

    const fetchNewMessages = async () => {
        try {
            let requestUrl = API_URL;
            if (lastMessageDatetimeRef.current) {
                requestUrl += `?datetime=${lastMessageDatetimeRef.current}`;
            }

            const response = await fetch(requestUrl);
            if (!response.ok) return;

            const serverMessages: UsersMessage[] = await response.json();

            if (serverMessages.length > 0) {
                setMessages((previousMessages) => {
                    const updatedMessages = [...previousMessages, ...serverMessages];
                    return updatedMessages.slice(-50);
                });

                lastMessageDatetimeRef.current = serverMessages[serverMessages.length - 1].datetime;
            }
        } catch (error) {
            console.error("Ошибка при получении сообщений:", error);
        }
    };

    const startMessagesInterval = () => {
        stopMessagesInterval();
        timerIdentifierRef.current = window.setInterval(fetchNewMessages, 3000);
    };

    const stopMessagesInterval = () => {
        if (timerIdentifierRef.current !== null) {
            clearInterval(timerIdentifierRef.current);
            timerIdentifierRef.current = null;
        }
    };

    const handleSendMessage = async (author: string, message: string) => {
        try {
            stopMessagesInterval();

            const requestBodyData = new URLSearchParams();
            requestBodyData.set('author', author);
            requestBodyData.set('message', message);

            await fetch(API_URL, {
                method: 'POST',
                body: requestBodyData,
            });

            await fetchNewMessages();
            startMessagesInterval();
        } catch (error) {
            console.error("Ошибка при отправке сообщения:", error);
            startMessagesInterval();
        }
    };

    useEffect(() => {
        fetchNewMessages().then(() => {
            startMessagesInterval();
        });

        return () => {
            stopMessagesInterval();
        };
    }, []);

    return (
        <Box sx={{ backgroundColor: '#f1f5f9', minHeight: '100vh', py: 6 }}>
            <Container maxWidth="sm">
                <CssBaseline />
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <Typography
                        variant="h4"
                        component="h1"
                        sx={{
                            fontWeight: 900,
                            background: 'linear-gradient(45deg, #6366f1, #a855f7)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            letterSpacing: '-1px',
                            mb: 0.5
                        }}
                    >
                        Сhat Workspace
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500 }}>
                        Свежие мысли участников
                    </Typography>
                </Box>
                <MessageForm onSendMessage={handleSendMessage} />
                <MessageList messagesList={messages} />
            </Container>
        </Box>
    );
};

export default App;
