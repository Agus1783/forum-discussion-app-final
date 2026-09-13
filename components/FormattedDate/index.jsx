'use client';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function FormattedDate({ date }) {
  const [formattedDate, setFormattedDate] = useState('-');

  useEffect(() => {
    if (!date) {
      return;
    }

    const result = new Intl.DateTimeFormat('id-ID', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(date));

    setFormattedDate(result);
  }, [date]);

  return <span>{formattedDate}</span>;
}

FormattedDate.propTypes = {
  date: PropTypes.string.isRequired
};
export default FormattedDate;
