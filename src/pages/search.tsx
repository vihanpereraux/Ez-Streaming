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
import Grid from '@mui/material/Grid';

// components
import SearchCard from "../components/search-card";
import ValidationMessage from "../components/validation-message";
import Navbar from "../components/navbar";

// services
import { getSearchResults } from "../services/api";

// interfaces
import { MoviesProps } from "../interfaces/props";

const Search: React.FC = () => {
    const [value, setValue] = useState<string>("");
    const [results, setResults] = useState<MoviesProps[]>([]);
    const [searchType, setSearchType] = useState<string>("movie");
    const [searched, setSearched] = useState<boolean>(false);

    const handleUserInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    }

    const getResults = async () => {
        const searchResultsLocalArr: MoviesProps[] = [];
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
        setResults([]);
    }


    return (
        <>
            <Navbar />
            <Box sx={{
                pl: { xs: 1, lg: 2 },
                pr: { xs: 1, lg: 2 },
                pt: 8
            }}>
                <Box sx={{
                    background: 'none',
                    mt: 0
                }}>
                    <Typography
                        sx={{
                            color: 'white',
                            fontSize: 16,
                            fontWeight: 400,
                            fontFamily: 'Rubik',
                            textAlign: 'center'
                        }}> Search your favourite Movies & TV Shows
                    </Typography>

                    <Box
                        sx={{
                            display: { xs: 'block', sm: 'flex' },
                            justifyContent: 'center',
                            marginTop: 5,
                            pl: { xs: 1, sm: 8, md: 20, lg: '25vw', xl: '30vw' },
                            pr: { xs: 1, sm: 8, md: 20, lg: '25vw', xl: '30vw' }
                        }}>
                        <input
                            className="search_input"
                            onChange={handleUserInput}
                            value={value}
                            style={{
                                width: '100%',
                                height: 50,
                                fontFamily: 'Rubik',
                                borderRadius: 8,
                                border: 'none',
                                backgroundColor: 'rgb(20, 20, 20)',
                                color: 'white',
                                fontSize: 14
                            }} placeholder="Type to search" type="text" />

                        {/* movies / tv selection */}
                        <Select
                            sx={{
                                color: 'white',
                                backgroundColor: 'rgb(20, 20, 20)',
                                width: { xs: '100%', sm: '25%' },
                                fontSize: 14,
                                fontFamily: 'Rubik',
                                ml: { xs: 0, sm: 1 },
                                mt: { xs: 1.5, sm: 0 },
                                height: 50,
                            }}
                            labelId="demo-simple-select-label"
                            id="search-type-select"
                            value={searchType}
                            onChange={handleSearchTypeChange}
                        >
                            <MenuItem value={"movie"}>Movies</MenuItem>
                            <MenuItem value={"tv"}>TV</MenuItem>
                        </Select>

                        <Button
                            className="search_button"
                            sx={{
                                width: { xs: '100%', sm: '20%' },
                                height: 50,
                                borderRadius: 1.8,
                                fontFamily: 'Rubik',
                                textTransform: 'capitalize',
                                fontWeight: 420,
                                fontSize: 14,
                                pl: 3,
                                pr: 3,
                                ml: { xs: 0, sm: 1 },
                                mt: { xs: 3, sm: 0 },
                                background: '#a2ff00',
                                color: "black"
                            }}
                            variant="contained"
                            disabled={value.length === 0}
                            onClick={getResults}>Search</Button>
                    </Box>
                </Box>

                {/* search results */}
                <Box sx={{ flexGrow: 1, mt: 3 }}>
                    <Grid container spacing={0}>
                        {results.length > 0 ? results.map((item, index) => (
                            <Grid
                                xs={searchType == "movie" ? 6 : 12}
                                sm={searchType == "movie" ? 4 : 4}
                                md={searchType == "movie" ? 2 : 3}
                                lg={searchType == "movie" ? 2 : 3}
                                key={index}>
                                <Box sx={{
                                    mt: 2.75,
                                    position: 'relative',
                                }}>
                                    <SearchCard
                                        id={item.id}
                                        overview={item.overview}
                                        type={searchType}
                                        vote_average={item.vote_average}
                                        release_date={item.release_date}
                                        poster_path={searchType == "movie" ? item.poster_path : item.backdrop_path}
                                        title={searchType === 'movie' ? item.title : item.original_name}
                                        original_name={item.original_name}
                                        first_air_date={item.first_air_date} />
                                </Box>
                            </Grid>
                        ))
                            :
                            (<div>
                                {searched && <ValidationMessage />}
                            </div>)}
                    </Grid>
                </Box>
            </Box>

            <Box sx={{ mb: 15 }}></Box>
        </>
    )
}

export default Search;