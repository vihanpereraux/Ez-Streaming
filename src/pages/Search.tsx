import React, { useState } from "react";

// MUI
import {
    Box,
    Typography,
    Button,
    Select,
    MenuItem,
    SelectChangeEvent
} from "@mui/material";

// components
import SearchCard from "../components/SearchCard";
import ValidationMessage from "../components/ValidationMessage";

// services
import { getSearchResults } from "../services/Api";

// interfaces
import { MoviesProps } from "../interfaces/props";

const Search: React.FC = () => {
    let searchResultsLocalArr: MoviesProps[] = []

    const [value, setValue] = useState<string>("");
    const [results, setResults] = useState<MoviesProps[]>(searchResultsLocalArr)
    const [searchType, setSearchType] = useState<string>("movie")
    const [searched, setSearched] = useState<boolean>(false);

    const handleUserInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    }

    const getResults = async () => {
        searchResultsLocalArr = [];
        const content: MoviesProps[] = await getSearchResults(value, searchType, searchResultsLocalArr) as MoviesProps[];
        if (content) { setResults([...content]); }

        if (content.length == 0) {
            setSearched(true);
        }
        else {
            setSearched(false);
        }
    }

    const handleSearchTypeChange = (e: SelectChangeEvent) => {
        setSearchType(e.target.value);
    }


    return (
        <>
            <Box sx={{ pt: 15, pl: { xs: 0, lg: 6 } }}>
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
                        }}> Search your favourite Movies & TV Shows
                    </Typography>

                    <Box
                        className="_search_field_wrapper"
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: 5,
                            pl: { xs: 1, lg: 50 },
                            pr: { xs: 1, lg: 50 }
                        }}>
                        <input
                            onChange={handleUserInput}
                            value={value}
                            style={{
                                width: '100%',
                                height: 55,
                                fontFamily: 'Rubik',
                                borderRadius: 8,
                                border: 'none',
                                backgroundColor: 'rgb(20, 20, 20)',
                                color: 'white',
                                fontSize: 16
                            }} placeholder="Type a name ..." type="text" />

                        {/* movies / tv selection */}
                        <Select
                            sx={{
                                color: 'white',
                                backgroundColor: 'rgb(20, 20, 20)',
                                width: '15%',
                                fontSize: 16,
                                fontFamily: 'Rubik',
                                ml: 1
                            }}
                            labelId="demo-simple-select-label"
                            id="search-type-select"
                            value={searchType}
                            onChange={handleSearchTypeChange}
                        >
                            <MenuItem value={"movie"}>Movies</MenuItem>
                            <MenuItem value={"tv"}>TV</MenuItem>
                        </Select>

                        <Button sx={{
                            height: 57,
                            borderRadius: 2,
                            fontFamily: 'Rubik',
                            textTransform: 'capitalize',
                            fontWeight: 500,
                            fontSize: 16,
                            pl: 3,
                            pr: 3,
                            ml: 1.5,
                            background: 'rgb(255, 255, 255)',
                            color: "black"
                        }}
                            variant="contained"
                            onClick={getResults}>Search</Button>
                    </Box>
                </Box>

                {/* search results */}
                <Box sx={{
                    position: 'relative',
                    display: 'flex',
                    flexWrap: 'wrap',
                    width: { xs: 'auto', lg: '100%' },
                    gap: 0,
                    pl: { xs: 2, lg: 0 },
                    pr: { xs: 2, lg: 0 }
                }}>
                    {results.length > 0 ? results.map((item, index) => (
                        <Box sx={{
                            width: { xs: 'calc(100%)', lg: 'calc(20% - 10px)' },
                            marginTop: '40px',
                        }} key={index}>
                            <SearchCard
                                id={item.id}
                                overview={item.overview}
                                type={searchType}
                                vote_average={item.vote_average}
                                release_date={item.release_date}
                                poster_path={item.poster_path}
                                title={searchType === 'movie' ? item.title : item.original_name}
                                original_name={item.original_name}
                                first_air_date={item.first_air_date} />
                        </Box>))
                        :
                        (<div>
                            {searched ? <ValidationMessage /> : null}
                        </div>)}
                </Box>
            </Box>
        </>
    )
}

export default Search;