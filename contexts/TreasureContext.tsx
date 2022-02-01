import React, {
  createContext,
  useReducer
} from 'react';
import lodashClonedeep from 'lodash.clonedeep';
import { Action, Amount, Token } from 'types/Oneshot.types';

const initialOneshotState: { actions: Action[], fromOneshotAmounts: Amount[], toOneshotAmounts: Amount[], actualOneshotAmounts: Amount[] } = {
  actions: [],
  fromOneshotAmounts: [],
  toOneshotAmounts: [],
  // #TODO: remove this dummy data
  actualOneshotAmounts: [{
    token: Token.USDC,
    quantity: 1739.45
  },
  {
    token: Token.Dai,
    quantity: 25.85
  },
  {
    token: Token.Ether,
    quantity: 634.95
  }],
};

export type OneshotAmounts = {
  from: Amount[]
  to: Amount[]
}

/** Inputting token = add, outputting token = subtract
    Afterwards, if a token is net positive, then its coming FROM the Oneshot.
    If a token is net negative, then its going TO the Oneshot. **/
const getOneshotAmountsForActions = (actions: Action[]): OneshotAmounts => {
  const tokens = {}

  actions.forEach(action => {
    if (action.input) {
      if (tokens[action.input.token] !== undefined) {
        tokens[action.input.token] = parseFloat(tokens[action.input.token]) + parseFloat(action.input.quantity as any ?? 0)
      } else {
        tokens[action.input.token] = parseFloat(action.input.quantity as any ?? 0)
      }
    }
    if (action.output) {
      if (tokens[action.output.token] !== undefined) {
        tokens[action.output.token] = parseFloat(tokens[action.output.token]) - parseFloat(action.output.quantity as any ?? 0)
      } else {
        tokens[action.output.token] = -parseFloat(action.output.quantity as any ?? 0)
      }
    }
  })

  const fromAmounts: Amount[] = []
  const toAmounts: Amount[] = []

  for (const token in tokens) {
    if (tokens[token] > 0) {
      fromAmounts.push({ token: token as Token, quantity: tokens[token] })
    } else if (tokens[token] < 0) {
      toAmounts.push({ token: token as Token, quantity: Math.abs(tokens[token]) })
    }
  }

  const oneshotAmounts: OneshotAmounts = {
    from: fromAmounts,
    to: toAmounts,
  }

  return oneshotAmounts
}

const oneshotReducer = (state, act) => {
  switch (act.type) {
    case 'ADDACTION': {
      const { action } = act.payload;
      const indexToRemove = state.actions.findIndex(b => b.id === action.id);
      if (indexToRemove >= 0) {
        return {
          ...state
        };
      } else {
        const newActions = state.actions.concat([action])
        const oneshotAmounts = getOneshotAmountsForActions(newActions)
        return {
          ...state,
          actions: newActions,
          fromOneshotAmounts: oneshotAmounts.from,
          toOneshotAmounts: oneshotAmounts.to,
        };
      }
    }
    case 'REMOVEACTION': {
      const { action } = act.payload;
      const indexToRemove = state.actions.findIndex(b => b.id === action.id);
      if (indexToRemove >= 0) {
        const newActionsArray = lodashClonedeep(state.actions);
        newActionsArray.splice(indexToRemove, 1);
        const oneshotAmounts = getOneshotAmountsForActions(newActionsArray)
        return {
          ...state,
          actions: newActionsArray,
          fromOneshotAmounts: oneshotAmounts.from,
          toOneshotAmounts: oneshotAmounts.to,
        };
      } else {
        return { ...state };
      }
    }
    case 'UPDATEACTION': {
      const { action } = act.payload;
      const indexToUpdate = state.actions.findIndex(b => b.id === action.id);
      if (indexToUpdate >= 0) {
        const newActionsArray = lodashClonedeep(state.actions);
        newActionsArray[indexToUpdate] = action;
        const oneshotAmounts = getOneshotAmountsForActions(newActionsArray)
        return {
          ...state,
          actions: newActionsArray,
          fromOneshotAmounts: oneshotAmounts.from,
          toOneshotAmounts: oneshotAmounts.to,
        };
      } else {
        return { ...state };
      }
    }
    case 'CLEAR': {
      return {
        ...state,
        actions: [],
        fromOneshotAmounts: [],
        toOneshotAmounts: [],
      };
    }
    default: {
      return { ...state };
    }
  }
};

const OneshotContext = createContext({
  ...initialOneshotState,
  addAction: (action: Action) => { },
  removeAction: (action: Action) => { },
  updateAction: (action: Action) => { },
  clearActions: () => { },
});

export const OneshotProvider = ({ children }) => {
  const [oneshotState, oneshotDispatch] = useReducer(oneshotReducer, initialOneshotState);

  const addAction = (action: Action) => {
    if (!action) {return}
    oneshotDispatch({
      type: 'ADDACTION',
      payload: {
        action
      }
    });
  };

  const removeAction = (action: Action) => {
    if (!action) {return}
    oneshotDispatch({
      type: 'REMOVEACTION',
      payload: {
        action
      }
    });
  };

  const updateAction = (action: Action) => {
    if (!action) {return}
    oneshotDispatch({
      type: 'UPDATEACTION',
      payload: {
        action
      }
    });
  };

  const clearActions = () => {
    oneshotDispatch({
      type: 'CLEAR'
    });
  };

  return (
    <OneshotContext.Provider
      value={{
        ...oneshotState,
        addAction,
        removeAction,
        updateAction,
        clearActions
      }}
    >
      {children}
    </OneshotContext.Provider>
  );
};

export {
  OneshotContext
}