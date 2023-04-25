---
emoji: 🙄
title: (React TS) 다양한 input을 다룰 수 있는 custom hook
date: '2022-04-23 00:00:00'
author: choieastsea
tags: React CustomHook Hooks UseCallback
categories: FE
---

react로 이것저것 할때마다 가장 귀찮은 것 중 하나가 input을 다루는 일이였다. 회원가입페이지 등을 구성하면서, input을 객체로 갖고 관리하지만 중복되는 코드가 매우 많아 귀찮다. 그래서 customHook을 만들어보았는데, 케이스에 맞게 적용할 수 있을 것 같아 업로드한다. 

우선, 해당 hook에서 대응가능한 event는 다음과 같다.

- Text Input event
- Select event : mui를 이용하여 프론트를 구성하였기에 해당 이벤트를 처리하였음
- check event 

```typescript
import { SelectChangeEvent } from '@mui/material';
import { ChangeEvent, Dispatch, SetStateAction, useCallback, useState } from 'react';

type SetState<T> = Dispatch<SetStateAction<T>>;

function useInputObjectCallback<T>(
  initialState: T
): [
  T,
  SetState<T>,
  (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>,
    inputType: string
  ) => void
] {
  const [state, setState] = useState<T>(initialState);
  const onChangeInput = useCallback(
    (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>,
      inputType: string
    ) => {
      const { value, type, checked } = e.target as HTMLInputElement;
      setState((prevObj) => ({
        ...prevObj,
        [inputType]: type === 'checkbox' ? checked : value,
      }));
    },
    []
  );
  return [state, setState, onChangeInput];
}

export { useInputObjectCallback };

```

사용법은 다음과 같다.

우선, 인풋 객체와 초기화 객체를 만들어준다.

```typescript
//model.ts
export type SignupInfo = {
  username: string;
  password: string;
  passwordConfirm: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  address: string;
};
export const SignupInit: SignupInfo = {
  username: '',
  password: '',
  passwordConfirm: '',
  first_name: '',
  last_name: '',
  phone_number: '',
  address: '',
};
```

react input component에 사용할 때, 

- custom hook을 호출하여 state, setState function, onChangeFunction을 할당받는다
- input 태그에 value는 `state.field_name`, onChange는 `(e)=>onChangeFunction(e, 'field_name')`으로 적어준다.

```react
<input
	placeholder="아이디"
	value={signupObj.username}
	onChange={(e) => onChangeSignupInput(e, 'username')}
/>

<OutlinedInput
  placeholder="주소"
  value={signupObj.address}
  onChange={(e) => onChangeSignupInput(e, 'address')}
/>
```

내가 주로 사용하는 mui에서도 편하게 사용이 가능하므로 input과 관련된 별도의 처리를 해주지 않아도 된다. 물론 validation을 해야한다면 onChange가 아닌 setState를 사용하면 될 것이다.

필드네임을 문자열로 관리하는 것이 좋은 방법은 아니지만, 이렇게 하면 코드를 줄일 수 있다고 생각한다~!