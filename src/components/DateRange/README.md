This component extends all the props of **[Calendar](#calendar)** component. In addition to those props, it has the following props: 

| Prop Name  |  Type |
|---|---|
|  **moveRangeOnFirstSelection** |  boolean |
|   **onRangeFocusChange** |  function |
|   **rangeColors**  |  array |
|   **ranges**  |  array |


#### Example: Editable Date Inputs
```jsx inside Markdown
import {useState} from 'react'
const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection'
    }
  ]);
  
<DateRange
  editableDateInputs={true}
  onChange={item => setState([item.selection])}
  moveRangeOnFirstSelection={false}
  ranges={state}
/>
```

#### Example: Constraints
```jsx inside Markdown
import {useState} from 'react'
const [state, setState] = useState([
    {
      key: 'selection',
      startDate: new Date('2021-07-11'),
      endDate: new Date('2021-07-17'),
    }
  ]);
  
<DateRange
  weekStartsOn={1}
  editableDateInputs={true}
  onChange={item => setState([item.selection])}
  moveRangeOnFirstSelection={false}
  ranges={state}
  minDate={new Date('2021-07-05')}
  maxDate={new Date('2021-07-25')}
  disabledDates={[new Date('2021-07-14'), new Date('2021-07-15'), new Date('2021-07-21')]}
  disabledStartDates={[new Date('2021-07-10'), new Date('2021-07-11'), new Date('2021-07-21')]}
  disabledEndDates={[new Date('2021-07-17'), new Date('2021-07-18'), new Date('2021-07-21')]}
/>
```
