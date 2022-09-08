import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

/**
 * 
 */
const initialState: ISearchState = {
    search: null
}

/**
 * 
 */
export const GlobalSearchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setGlobalSearch: (state, action: PayloadAction<IKeywordOption[]>) => {
            state.search = action.payload;
        },
        clearGlobalSearch: (state) => {
            state.search = null;
        }
    }
})

const { setGlobalSearch, clearGlobalSearch }
    = GlobalSearchSlice.actions;
export default GlobalSearchSlice.reducer;


//
export const handleSetGlobalSearchSlice = (searchKeywords: IKeywordOption[]) => (dispatch: any) => {
    dispatch(setGlobalSearch(searchKeywords))
}

//
export const handleClearGlobalSearch = () => (dispatch: any) => {
    dispatch(clearGlobalSearch())
}


//
interface ISearchState {
    search: IKeywordOption[] | null;
}

//
interface IKeywordOption {
    label: string;
    value: string;
}