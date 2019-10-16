import { useMemo } from 'react';
import { assignQueryAlias } from '@codeforafrica/hurumap-ui/factory/utils';
import sectionedCharts from './charts.json';

export default () => useMemo(() => assignQueryAlias(sectionedCharts), []);
