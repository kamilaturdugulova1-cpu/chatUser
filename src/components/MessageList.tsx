import React from 'react';
import { Box, Paper, Typography, Avatar } from '@mui/material';
import type { UsersMessage } from '../types';

interface MessageListProps {
    messagesList: UsersMessage[];
}

export const MessageList: React.FC<MessageListProps> = ({ messagesList }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                maxHeight: '55vh',
                overflowY: 'auto',
                p: 2,
                backgroundColor: '#ffffff',
                borderRadius: 4,
                border: '1px solid #e4ecf5',
                '&::-webkit-scrollbar': { width: '6px' },
                '&::-webkit-scrollbar-thumb': { backgroundColor: '#e4ecf5', borderRadius: '4px' }
            }}
        >
            {messagesList.map((messageItem) => (
                <Paper
                    key={messageItem._id}
                    elevation={0}
                    sx={{
                        p: 2,
                        borderRadius: 3,
                        backgroundColor: '#f8fafc',
                        borderLeft: '4px solid #9c27b0',
                        display: 'flex',
                        gap: 2,
                        alignItems: 'flex-start'
                    }}
                >
                    <Avatar sx={{ bgcolor: '#9c27b0', width: 36, height: 36, fontSize: '14px', fontWeight: 'bold' }}>
                        {messageItem.author.charAt(0).toUpperCase()}
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#1e293b' }}>
                                {messageItem.author}
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                                {new Date(messageItem.datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </Typography>
                        </Box>
                        <Typography variant="body2" sx={{ color: '#334155', wordBreak: 'break-word' }}>
                            {messageItem.message}
                        </Typography>
                    </Box>
                </Paper>
            ))}
        </Box>
    );
};