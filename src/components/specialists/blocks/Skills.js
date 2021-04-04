import Link from "next/link";
import {
    Card, CardHeader, Divider, Box, CardContent, makeStyles
} from "@material-ui/core";

import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';

import RichText from "../../richtext";

const useStyles = makeStyles((theme) => ({
    textCenter: {
        textAlign: "center"
    }
}));

const Skills = ({ skills }) => {
    const classes = useStyles();
    if (skills.length) {
        return (
            <Card>
                <CardHeader titleTypographyProps={{ variant: 'h3' }} title="Skills" />
                <Divider />
                <CardContent>
                    <Box mt={2}>
                        {skills.map((skill, index) => {
                            return (
                                <Box margin={2} key={index}>
                                    <h4>{skill.name}:</h4>
                                    <br/>
                                    <RichText paragraph={skill.description} />
                                    {(index < skills.length - 1) && (
                                        <>
                                            <br />
                                            <Divider />
                                        </>
                                    )}
                                </Box>
                            )
                        })}
                    </Box>
                </CardContent>
            </Card>
        )
    } else {
        return null;
    }

}

export default Skills;