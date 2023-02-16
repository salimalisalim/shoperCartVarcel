import {
    ADD_TO_WISH_LIST,
    REMOVE_FROM_WISH_LIST,
    EMPTY_WISH_LIST
} from "../constants/wishlistConstants";

export const wishListReducer = (
    state = { wishListItems: [] },
    action
) => {
    switch (action.type) {
        case ADD_TO_WISH_LIST:
            const item = action.payload;

            const isItemExist = state.wishListItems.find(
                (i) => i.product === item.product
            );

            if (isItemExist) {
                return {
                    ...state,
                    wishListItems: state.wishListItems.map((i) =>
                        i.product === isItemExist.product ? item : i
                    ),
                };
            } else {
                return {
                    ...state,
                    wishListItems: [...state.wishListItems, item],
                };
            }

        case REMOVE_FROM_WISH_LIST:
            return {
                ...state,
                wishListItems: state.wishListItems.filter((i) => i.product !== action.payload),
            };

        case EMPTY_WISH_LIST:
            return {
                ...state,
                wishListItems: action.payload,
            };

        default:
            return state;
    }
}