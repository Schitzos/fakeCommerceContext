import React, {useCallback} from 'react';
import Navigation from './navigation';
import ContextProvider from './context';
import 'react-native-gesture-handler';
import {
  RenderPassReport,
  PerformanceProfiler,
} from '@shopify/react-native-performance';

function App() {
  const onReportPrepared = useCallback((report: RenderPassReport) => {
    console.log(report);
  }, []);

  return (
    <PerformanceProfiler onReportPrepared={onReportPrepared}>
      <ContextProvider>
        <Navigation />
      </ContextProvider>
    </PerformanceProfiler>
  );
}

export default App;
