import {
    Box,
    Grid,
} from '@material-ui/core';
import SocialMedia from './blocks/SocialMedia';
import Skills from "./blocks/Skills";

const Profile = ({
    personalInfo,
}) => {
    const owner = personalInfo.owner;
    const socialAccounts = personalInfo.socialAccounts;
    const skills = personalInfo.skills;
    return (

        <Grid
            container
            spacing={3}
        >
            {(skills.length > 0) && (
                <Grid
                    item
                    xs={12}
                    md={6}
                    lg={8}
                >
                    <Skills skills={skills} />
                </Grid>
            )}

            {(socialAccounts.length > 0) && (
                <Grid
                    item
                    xs={12}
                    md={6}
                    lg={4}
                >
                    <SocialMedia socialAccounts={socialAccounts} owner={owner} />
                </Grid>
            )}

        </Grid>
    );
}

export default Profile;
