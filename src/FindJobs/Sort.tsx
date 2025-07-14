import { useState } from 'react';
import { Button, Combobox, useCombobox, Text, Box } from '@mantine/core';
import { IconSettingsCode } from '@tabler/icons-react';
import { useDispatch } from 'react-redux';
import { updateSort } from '../Slices/SortSlice';

const opt = ['Relevance', 'Most Recent', 'Salary: high - low', 'Salary: low - high'];
const talentSort = ["Relevance", "Most Recent", "Experience: Low to High", "Experience: High to Low"];

const Sort=(props:any) => {
  const dispatch = useDispatch();
  const [selectedItem, setSelectedItem] = useState<string | null>('Relevance');
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const options = props.sort === "job" ? opt.map((item) => (
    <Combobox.Option className='!text-xs' value={item} key={item}>
      {item}
    </Combobox.Option>
  )) : talentSort.map((item) => (
    <Combobox.Option className='!text-xs' value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  return (
      <Combobox
        store={combobox}
        width={150}
        position="bottom-start"
        onOptionSubmit={(val) => {
          setSelectedItem(val);
          dispatch(updateSort(val));
          combobox.closeDropdown();
        }}
      >
        <Combobox.Target>
          <div onClick={()=>combobox.toggleDropdown()} className='cursor-pointer border border-bright-sun-400 flex gap-2 px-2 py-1 text-sm rounded-lg items-center'>
            {selectedItem} <IconSettingsCode className='h-5 w-5 text-bright-sun-400'/>
          </div>
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Options>{options}</Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
  );
} 
export default Sort;