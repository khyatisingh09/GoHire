import { useEffect, useState } from 'react';
import { Checkbox, Combobox, Group, Pill, PillsInput, useCombobox,Input } from '@mantine/core';
import { IconFoldDown } from '@tabler/icons-react';
import { useDispatch } from 'react-redux';
import { updateFilter } from '../Slices/FilterSlice';

const Multiinput = (props: any) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [data, setData] = useState<string[]>([]);
  const [value, setValue] = useState<string[]>([]);

  useEffect(() => {
    setData(props.options);
  }, [props.options]);

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
  });

  const exactOptionMatch = data.some((item) => item === search);

  const handleValueSelect = (val: string) => {
    setSearch('');

    if (val === '$create') {
      setData((current) => [...current, search]);
      setValue((current) => [...current, search]);
      dispatch(updateFilter({ [props.title]: [...value, search] }));
    } else {
      dispatch(updateFilter({ [props.title]: value.includes(val) ? value.filter(v => v !== val) : [...value, val] }));
      setValue((current) =>
        current.includes(val) ? current.filter((v) => v !== val) : [...current, val]);
    }
  };

  const handleValueRemove = (val: string) => {
    setValue((current) => current.filter((v) => v !== val));
    dispatch(updateFilter({ [props.title]: value.filter((v) => v !== val) }));
  };

  const values = value.slice(0, 1).map((item) => (
    <Pill key={item} withRemoveButton onRemove={() => handleValueRemove(item)}>
      {item}
    </Pill>
  ));

  // Sort the data array before mapping
  const sortedData = data.sort((a, b) => a.localeCompare(b));

  const options = sortedData
    .filter((item) => item.toLowerCase().includes(search.trim().toLowerCase()))
    .map((item) => (
      <Combobox.Option value={item} key={item} active={value.includes(item)}>
        <Group gap="sm">
          <Checkbox
            size="xs"
            color="bright-sun.6"
            checked={value.includes(item)}
            onChange={() => {}}
            aria-hidden
            tabIndex={-1}
            style={{ pointerEvents: 'none' }}
          />
          <span className="text-mine-shaft-300">{item}</span>
        </Group>
      </Combobox.Option>
    ));

  return (
    <Combobox store={combobox} onOptionSubmit={handleValueSelect} withinPortal={false}>
      <Combobox.DropdownTarget>
        <PillsInput
          variant="unstyled"
          rightSection={<IconFoldDown />}
          onClick={() => combobox.toggleDropdown()}
          leftSection={
            <div className="text-bright-sun-400 p-1 bg-mine-shaft-900 rounded-full mr-2">
              <props.icon />
            </div>
          }
        >
          <Pill.Group>
            {values.length > 0 ? (
              <>
                {values}
                {value.length > 1 && <Pill>+{value.length - 1} more</Pill>}
              </>
            ) : (
              <Input.Placeholder className="text-mine-shaft-200">{props.title}</Input.Placeholder>
            )}
          </Pill.Group>
        </PillsInput>
      </Combobox.DropdownTarget>
      <Combobox.Dropdown>
        <Combobox.Search
          value={search}
          onChange={(event) => setSearch(event.currentTarget.value)}
          placeholder="search jobs"
        />
        <Combobox.Options>
          {options}
          {!exactOptionMatch && search.trim().length > 0 && (
            <Combobox.Option value="$create">+ Create {search}</Combobox.Option>
          )}
          {exactOptionMatch && search.trim().length > 0 && options.length === 0 && (
            <Combobox.Empty>Nothing found</Combobox.Empty>
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};

export default Multiinput;