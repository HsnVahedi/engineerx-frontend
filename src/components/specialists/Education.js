import {
    Grid,
} from '@material-ui/core';
import Educations from "./blocks/Educations";

const Education = ({
    personalInfo,
}) => {
    const educations = personalInfo.educations;
    return (
        <Grid
            container
            spacing={3}
        >
            {(educations.length > 0) && (
                <Grid
                    item
                    xs={12}
                    md={6}
                    lg={8}
                >
                    <Educations educations={educations} />
                </Grid>
            )}
        </Grid>
    );
}

export default Education;
