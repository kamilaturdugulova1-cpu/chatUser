import React,{useState} from 'react';
import {TextField,Button,Box} from '@mui/material';

interface MessageFormProps {
    onSendMessage: (author: string, message: string) => Promise<void>;
}

export const MessageForm: React.FC<MessageFormProps> = ({ onSendMessage }) => {
    const [authorName, setAuthorName] = useState('');
    const [messageText, setMessageText] = useState('');

    const handleFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!authorName.trim() || !messageText.trim()) return;

        await onSendMessage(authorName, messageText);
        setMessageText('');
    };

    return (
        <Box component="form" onSubmit={handleFormSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
            <TextField
                label="Автор"
                variant="outlined"
                fullWidth
                value={authorName}
                onChange={(event) => setAuthorName(event.target.value)}
            />
            <TextField
                label="Сообщение"
                variant="outlined"
                fullWidth
                multiline
                rows={2}
                value={messageText}
                onChange={(event) => setMessageText(event.target.value)}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
                Отправить
            </Button>
        </Box>
    );
};