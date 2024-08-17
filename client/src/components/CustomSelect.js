import React from 'react';
import { Select, Popper } from '@mui/material';

const CustomSelect = React.forwardRef(function CustomSelect(props, ref) {
  return (
    <Select
      {...props}
      ref={ref}
      MenuProps={{
        ...props.MenuProps,
        PopperComponent: (popperProps) => (
          <Popper
            {...popperProps}
            modifiers={[
              {
                name: 'preventOverflow',
                enabled: false,
              },
            ]}
          />
        ),
      }}
    />
  );
});

export default CustomSelect;