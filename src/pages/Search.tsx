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
                    mt: 5
                }}>
                    <Typography
                        sx={{
                            color: 'white',
                            fontSize: 26,
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
                            backgroundColor: 'rgb(18, 0, 76)',
                            color: 'white',
                            fontSize: 18
                        }} placeholder="Type something ..." type="text" />

                        <Button sx={{
                            height: 57,
                            borderRadius: 2,
                            fontFamily: 'Rubik',
                            textTransform: 'capitalize',
                            fontWeight: 400,
                            fontSize: 18,
                            pl: 4,
                            pr: 4,
                            ml: 1.5,
                            background: 'rgb(43, 0, 124)',
                        }} variant="contained">Search</Button>
                    </Box>

                    {/* tv movie selection */}
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        mt: 2
                    }}>
                        <RadioGroup sx={{}} row>
                            <FormControlLabel value="all" control={<Radio />} label="All" /> &nbsp;
                            <FormControlLabel value="movies" control={<Radio />} label="Movies" /> &nbsp;
                            <FormControlLabel value="tv" control={<Radio />} label="TV Shows" />
                        </RadioGroup>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default Search;