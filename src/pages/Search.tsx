import React, { useState } from "react";

// MUI
import {
    Box,
    Typography,
    Button,
    RadioGroup,
    FormControlLabel,
} from "@mui/material";
import Radio from "@mui/material/Radio";

// components
import SearchCard from "../components/SearchCard";

// services
import { getSearchResults } from "../services/Api";

// interfaces
import { MoviesProps } from "../interfaces/props";

let searchResultsLocalArr: MoviesProps[] = []
const Search: React.FC = () => {
    const [value, setValue] = useState<string>("");
    const [results, setResults] = useState<MoviesProps[]>(searchResultsLocalArr)

    const handleUserInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    }

    const getResults = async () => {
        searchResultsLocalArr = [];
        const content = await getSearchResults(value, searchResultsLocalArr);
        if (content) { setResults([...content]); console.log(content) }
    }


    return (
        <>
            <Box sx={{ pt: 15, pl: 6 }}>
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
                        <input
                            onChange={handleUserInput}
                            value={value}
                            style={{
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
                        }}
                            variant="contained"
                            onClick={getResults}>Search</Button>
                    </Box>

                    {/* tv / movie selection */}
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
                                // checked={true}
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

                {/* search results */}
                <Box sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    width: '100%',
                    gap: 0
                }}>
                    {results.map((item, index) => (
                        <div style={{
                            width: 'calc(20% - 10px)',
                            marginTop: '40px',
                        }} key={index}>
                            <SearchCard
                                id={item.id}
                                overview={item.overview}
                                type="movie"
                                vote_average={item.vote_average}
                                release_date={item.release_date}
                                poster_path={item.poster_path}
                                title={item.title} />
                        </div>
                    ))}
                </Box>
            </Box>
        </>
    )
}

export default Search;