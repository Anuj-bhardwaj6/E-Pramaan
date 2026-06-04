import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
// removed Paper
import { GitHub, LinkedIn } from '@mui/icons-material';
import defaultAvatar from '../assets/user.png';

export default function About() {
  const teamMembers = [
    {
      name: '',
      work: 'Led frontend architecture, routing, and responsive UI with Material UI.',
      github: '',
      linkedin: '',
      photo: '',
    },
    {
      name: '',
      work: 'Implemented authentication, state management, and secure Firebase integration.',
      github: '',
      linkedin: '',
      photo: '',
    },
    {
      name: '',
      work: 'Built reusable components, accessibility, and performance optimizations.',
      github: '',
      linkedin: '',
      photo: '',
    },
    {
      name: '',
      work: 'Designed UX flows, content strategy, and visual design system.',
      github: '',
      linkedin: '',
      photo: '',
    },
    {
      name: '',
      work: 'Managed CI/CD, testing, and cloud deployment processes.',
      github: '',
      linkedin: '',
      photo: '',
    },
    {
      name: '',
      work: 'Data modeling, analytics dashboards, and API integration layers.',
      github: '',
      linkedin: '',
      photo: '',
    },
  ];

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ mt: '90px', textAlign: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a' }}>
          About This Project
        </Typography>
        <Typography variant="body1" sx={{ mt: 2, color: '#334155' }}>
          Smart India Hackathon project showcasing a modern, secure web app built with React, Firebase, and Material UI. Our team focuses on usability, performance, and accessible design, delivering a scalable solution for real-world users. Explore features, read our approach, and meet the contributors who made this product possible throughout development cycles.
        </Typography>
      </Box>

      <Divider sx={{ my: 4 }} />

      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: '#0f172a' }}>
          The Team
        </Typography>

        <Box className="about-grid">
          {teamMembers.map((member) => (
            <Box key={member.name} className="about-grid-item">
              <Box sx={{ p: 2.5, width: '100%', height: '100%', border: '1px solid #e5e7eb', borderRadius: 2, backgroundColor: '#fff' }} className="about-card">
                <Avatar src={member.photo || defaultAvatar} alt={member.name} className="about-avatar" />
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#0f172a' }}>{member.name}</Typography>
                  <Typography variant="body2" sx={{ color: '#475569', mt: 0.75 }}>{member.work}</Typography>
                  <Box sx={{ mt: 1, display: 'flex', alignItems: 'center' }} className="about-actions">
                    <IconButton component="a" href={member.github} target="_blank" rel="noopener" aria-label={`${member.name} GitHub`} size="small">
                      <GitHub fontSize="small" />
                    </IconButton>
                    <IconButton component="a" href={member.linkedin} target="_blank" rel="noopener" aria-label={`${member.name} LinkedIn`} size="small" sx={{ ml: 0.5 }}>
                      <LinkedIn fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      <Divider sx={{ my: 4 }} />

      <Box sx={{ color: '#475569' }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1, color: '#0f172a' }}>
          Our Focus
        </Typography>
        <Typography variant="body2">
          Reliability, security, and delightful user experience. We actively iterate based on feedback and aim to make the solution easy to adopt and extend.
        </Typography>
      </Box>
    </Box>
  );
}