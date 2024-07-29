import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
// import { Center } from '@mantine/core';
import { useState } from 'react';

import SearchForm from './components/SearchForm';
import SelectPatient from './components/SelectPatient';
import ViewPatient from './components/ViewPatient';

// import { useFullscreen } from '@mantine/hooks';

export default function App() {
  const [data, setData] = useState([]);
  const [uniqueData, setUniqueData] = useState([]);
  const [showSelectPatient, setShowSelectPatient] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleData = (data) => {
    setData(data);
    setFormSubmitted(true);
  };

  const handleUniqueData = (uniqueData) => {
    setUniqueData(uniqueData);
    if (uniqueData.length > 1) {
      setShowSelectPatient(true);
    } else {
      setShowSelectPatient(false);
    }
  };
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <>
        {!formSubmitted && (
          <SearchForm onData={handleData} onUniqueData={handleUniqueData} />
        )}
        {formSubmitted && (
          showSelectPatient ? (
            <SelectPatient onData={handleData} onUniqueData={handleUniqueData} />
          ) : (
            <ViewPatient data={data} />
          )
        )}
      </>
    </MantineProvider>
  );
}