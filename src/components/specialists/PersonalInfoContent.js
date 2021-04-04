import {
    Box,
    Container,
    Divider,
    Tab,
    Tabs
} from "@material-ui/core";
import { useState } from "react";
import Experience from "./Experience";
import Education from "./Education";
import Profile from "./Profile";
import Posts from "./Posts";

const getTabs = (personalInfo, posts) => {
    let tabs = [];
    tabs.push({ value: 'profile', label: 'Profile' });

    const experiences = personalInfo.experiences;
    if (experiences.length > 0) {
        tabs.push({ value: 'experience', label: 'Experience' });
    }

    const educations = personalInfo.educations;
    if (educations.length > 0) {
        tabs.push({ value: 'education', label: 'Education' });
    }

    if (posts.length > 0) {
        tabs.push({ value: 'posts', label: 'Posts' });
    }
    return tabs;
}

const PersonalInfoContent = ({ personalInfo, posts }) => {
    const tabs = getTabs(personalInfo, posts);
    const [currentTab, setCurrentTab] = useState('profile');
    const handleTabsChange = (event, value) => {
        setCurrentTab(value);
    };
    return (
        <Container maxWidth="lg">
            <Box mt={3}>
                <Tabs
                    onChange={handleTabsChange}
                    scrollButtons="auto"
                    value={currentTab}
                    textColor="secondary"
                    variant="scrollable"
                >
                    {tabs.map((tab) => (
                        <Tab
                            key={tab.value}
                            label={tab.label}
                            value={tab.value}
                        />
                    ))}
                </Tabs>
            </Box>
            <Divider />
            <Box
                py={3}
                pb={6}
            >
                {currentTab === 'profile' && <Profile personalInfo={personalInfo} />}
                {currentTab === 'experience' && <Experience personalInfo={personalInfo} />}
                {currentTab === 'education' && <Education personalInfo={personalInfo} />}
                {currentTab === 'posts' && <Posts posts={posts} />}
            </Box>
        </Container>
    )
}

export default PersonalInfoContent;