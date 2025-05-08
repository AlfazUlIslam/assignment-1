# What is the use of the keyof keyword in TypeScript? Provide an example.
In typescript, <code>keyof</code> is used to make custom union types by extracting keys of an object type. The object type must have explicit keys. Works with both type aliases and interfaces.

Suppose, we have an object type called <code>TNetworkStatus</code>. It has the following keys: <code>loading</code>, <code>succeded</code>, <code>failed</code>.
<code>keyof</code> can be used to extract the keys and make a union type like this: <code>"loading" | "succeded" | "failed"</code>.

### Example with type alias
```typescript
type TNetworkStatus = {
    loading: boolean;
    succeded: boolean;
    failed: boolean;
};

type TStatus = keyof TNetworkStatus;

let status: TStatus;

status = "loading"; // Acceptable. No errors.
status = "successful" // Error: Type '"successful"' is not assignable to type 'keyof TNetworkStatus'
```
### Example with interface
```typescript
interface INetworkStatus {
    loading: boolean;
    succeded: boolean;
    failed: boolean;
};

type TStatus = keyof INetworkStatus;

let status: TStatus;

status = "loading"; // Acceptable. No errors.
status = "successful" // Error: Type '"successful"' is not assignable to type 'keyof TNetworkStatus'
```
As <code>"successful"</code> is not included in <code>"loading" | "succeded" | "failed"</code>, we get an error.

### Small exercise
Let's do a simple implementation of keyof

```typescript
type TSmartPhone = {
    name: string;
    price: number;
    processor: string;
};

const smartPhone: TSmartPhone = {
    name: "iPhone X",
    price: 1000,
    processor: "A11 Bionic"
};

const getSmartPhoneFeature = (smartPhone: TSmartPhone, feature: keyof TSmartPhone) => {
    return smartPhone[feature];
};

console.log(getSmartPhoneFeature(smartPhone, "processor"));
console.log(getSmartPhoneFeature(smartPhone, "name"));

/*
Output: A11 Bionic
Output: iPhone X
*/
```
Above we are using <code>keyof TSmartPhone</code> to restrict the <code>feature</code> parameter to take only the valid properties of a smartphone. Which would be <code>"name" | "price" | "processor"</code>. The union type created from the keys of <code>TSmartPhone</code>.

<br><br><br>

# What is the use of enums in TypeScript? Provide an example of a numeric and string enum.

Enums contain a group of constants. They represent data in key and value pairs.
Enums contain two types of value: string and numeric.

### Syntax
```typescript
// Here value can be string or number
enum Identifier {
    Key1 = value,
    Key2 = value
}; 
```

### Example
- String enum
```typescript
enum Continents {
    Asia = "ASIA",
    Africa = "AFRICA",
    Oceania = "OCEANIA",
    Europe = "EUROPE",
    America = "AMERICA",
    Antarctica = "ANTARCTICA"
}

console.log(Continents.Africa); // Output: AFRICA
```
- Numeric enum
Numeric enums are a bit different. If not initialized, they are given default values.

```typescript
enum Digits {
    FirstDigit,
    SecondDigit,
    ThirdDigit,
    FourthDigit
};

console.log(Digits.FirstDigit); // Output: 0
console.log(Digits.SecondDigit); // Output: 1
console.log(Digits.ThirdDigit); // Output: 2
```
If a value is initialized, the following values increment automatically.

```typescript
enum Digits {
    FirstDigit = 10,
    SecondDigit,
    ThirdDigit,
    FourthDigit
};

console.log(Digits.FirstDigit); // Output: 10
console.log(Digits.SecondDigit); // Output: 11
console.log(Digits.ThirdDigit); // Output: 12
```
If needed all values can be initialized.

```typescript
enum HTTPStatusCode {
    OK = 200,
    BadRequest = 400,
    NotFound = 404,
    InternalServerError = 500
}
```
### Use cases
Used to group related values together. Instead of having related values stored in scatered variables, it is much better to store them in the same enum. Essentialy, it is used for grouping together a set of distinct cases.
- We can consider our last code snippet. 
```typescript
enum HTTPStatusCode {
    OK = 200,
    BadRequest = 400,
    NotFound = 404,
    InternalServerError = 500
}
```
Instead of keeping the HTTPStatusCodes in seperate variables like: <code>ok</code>, <code>badRequest</code>, <code>notFound</code>, it would be better to keep them grouped together in a single <code>HTTPStatusCode</code> enum.

- It can be used in client-side state management. Let's consider the code snippet below:

```typescript
import { useReducer } from "react";
import { CounterType, CounterActionType, CounterReducerType } from "../../@types/Counter"

enum Actions {
    Reset = "RESET",
    Increment = "INCREMENT",
    Decrement = "DECREMENT"
};

const initialState: CounterType = { count: 0 }

const reducer = (state: CounterType, action: CounterActionType): CounterType => {
    switch (action.type) {
        case Actions.Reset:
            return initialState
        case Actions.Increment:
            return {...state, count: action.payload}
        case Actions.Decrement:
            return {...state, count: action.payload}
        default:
            throw new Error("Unknown action")
    }
}

const counterReducer = (): CounterReducerType => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const increment = (): void => { 
    dispatch({ type: Actions.Increment, payload: state.count + 1 }) 
  }

  const decrement = (): void => { 
      dispatch({ type: Actions.Decrement, payload: state.count - 1 }) 
  }

  const reset = (): void => {
      dispatch({ type: Actions.Reset })
  }

  return {
    state,
    actions: { increment, decrement, reset }
  } as const
}

export default counterReducer
```
A state logic for making a counter is being handled by <code>useReducer()</code>.
Instead of hard coding our actions in the <strong>reducer function</strong> and <strong>action creators:</strong> <code>increment()</code>, <code>decrement()</code>, <code>reset()</code>, we have stored the values in <code>Actions</code> enum. So, we have a single source of truth now.