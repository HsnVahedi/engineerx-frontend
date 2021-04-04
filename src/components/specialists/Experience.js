import {
    Grid,
} from '@material-ui/core';
import Experiences from "./blocks/Experiences";

const Experience = ({
    personalInfo,
}) => {
    const experiences = personalInfo.experiences;
    return (
        <Grid
            container
            spacing={3}
        >
            {(experiences.length > 0) && (
                <Grid
                    item
                    xs={12}
                    md={6}
                    lg={8}
                >
                    <Experiences experiences={experiences} />
                </Grid>
            )}
        </Grid>
    );
}

export default Experience;
