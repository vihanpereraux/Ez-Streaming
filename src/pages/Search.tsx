import React from "react";

// MUI
import {
    Box,
    Typography,
    Button,
    RadioGroup,
    FormControlLabel
} from "@mui/material";
import Radio from "@mui/material/Radio";

const Search: React.FC = () => {
    return (
        <>
            <Box sx={{ pt: 15 }}>
                <Box sx={{
                    background: 'none',
                    mt: 2
                }}>
                    <Typography
                        sx={{
                            color: 'white',
                            fontSize: 22,
                            fontWeight: 450,
                            fontFamily: 'Rubik',
                            textAlign: 'center'
                        }}>
                        Search your favourite Movies & TV Shows
                    </Typography>

                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        mt: 5
                    }}>
                        <input style={{
                            width: '40%',
                            height: 55,
                            fontFamily: 'Rubik',
                            borderRadius: 8,
                            border: 'none',
                            backgroundColor: 'rgb(20, 20, 20)',
                            color: 'white',
                            fontSize: 16
                        }} placeholder="Type something ..." type="text" />

                        <Button sx={{
                            height: 57,
                            borderRadius: 2,
                            fontFamily: 'Rubik',
                            textTransform: 'capitalize',
                            fontWeight: 500,
                            fontSize: 16,
                            pl: 4,
                            pr: 4,
                            ml: 1.5,
                            background: 'rgb(255, 255, 255)',
                            color: "black"
                        }} variant="contained">Search</Button>
                    </Box>

                    {/* tv movie selection */}
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        mt: 2,
                        color: 'white',
                        fontSize: 16
                    }}>
                        <RadioGroup row>
                            <FormControlLabel
                                className="_search_checkbox"
                                value="all"
                                control={<Radio />}
                                label="All" /> &nbsp;&nbsp;

                            <FormControlLabel
                                className="_search_checkbox"
                                value="movies"
                                control={<Radio />}
                                label="Movies" /> &nbsp;&nbsp;

                            <FormControlLabel
                                className="_search_checkbox"
                                value="tv"
                                control={<Radio />}
                                label="TV Shows" />
                        </RadioGroup>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default Search;