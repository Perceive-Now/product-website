import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

/**
 * 
 */
const initialState: ISearchState = {
    search: undefined
}

/**
 * 
 */
export const DashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        setDashboardSearch: (state, action: PayloadAction<IKeywordOption[]>) => {
            state.search = action.payload;
        },
        clearDashboardSearch: (state) => {
            state.search = undefined;
        }
    }
})

const { setDashboardSearch, clearDashboardSearch }
    = DashboardSlice.actions;
export default DashboardSlice.reducer;


//
export const handleSetDashboardSearch = (searchKeywords: IKeywordOption[]) => (dispatch: any) => {
    dispatch(setDashboardSearch(searchKeywords))
}

//
export const handlDashboardSearch = () => (dispatch: any) => {
    dispatch(clearDashboardSearch())
}


//
interface ISearchState {
    search: IKeywordOption[] | undefined;
}

//
interface IKeywordOption {
    label: string;
    value: string;
}