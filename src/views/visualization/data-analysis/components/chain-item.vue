<template>
  <a-spin :loading="loading" style="width: 100%">
    <a-card :bordered="false" :style="cardStyle">
      <div class="content-wrap">
        <div class="content">
          <a-statistic :title="title" :value="renderData.count" :value-from="0" animation show-group-separator />
          <div class="desc">
            <a-typography-text type="secondary" class="label">
              {{ $t('dataAnalysis.card.yesterday') }}
            </a-typography-text>
            <a-typography-text type="danger">
              {{ renderData.growth }}
              <icon-arrow-rise />
            </a-typography-text>
          </div>
        </div>
        <div class="chart">
          <Chart v-if="!loading" :option="chartOption" />
        </div>
      </div>
    </a-card>
  </a-spin>
</template>

<script lang="ts" setup>
import { ref, PropType, CSSProperties } from 'vue';
import useLoading from '@/hooks/loading';
import {
  queryPublicOpinionAnalysis,
  PublicOpinionAnalysis,
  PublicOpinionAnalysisRes,
} from '@/api/visualization';
import useChartOption from '@/hooks/chart-option';

const barChartOptionsFactory = () => {
  const data = ref<any>([]);
  const { chartOption } = useChartOption(() => {
    return {
      grid: {
        left: 0,
        right: 0,
        top: 10,
        bottom: 0,
      },
      xAxis: {
        type: 'category',
        show: false,
      },
      yAxis: {
        show: false,
      },
      tooltip: {
        show: true,
        trigger: 'axis',
      },
      series: {
        name: 'total',
        data,
        type: 'bar',
        barWidth: 7,
        itemStyle: {
          borderRadius: 2,
        },
      },
    };
  });
  return {
    data,
    chartOption,
  };
};

const lineChartOptionsFactory = () => {
  const data = ref<number[][]>([[], []]);
  const { chartOption } = useChartOption(() => {
    return {
      grid: {
        left: 0,
        right: 0,
        top: 10,
        bottom: 0,
      },
      xAxis: {
        type: 'category',
        show: false,
      },
      yAxis: {
        show: false,
      },
      tooltip: {
        show: true,
        trigger: 'axis',
      },
      series: [
        {
          name: '2001',
          data: data.value[0],
          type: 'line',
          showSymbol: false,
          smooth: true,
          lineStyle: {
            color: '#165DFF',
            width: 3,
          },
        },
        {
          name: '2002',
          data: data.value[1],
          type: 'line',
          showSymbol: false,
          smooth: true,
          lineStyle: {
            color: '#6AA1FF',
            width: 3,
            type: 'dashed',
          },
        },
      ],
    };
  });
  return {
    data,
    chartOption,
  };
};

const pieChartOptionsFactory = () => {
  const data = ref<any>([]);
  const { chartOption } = useChartOption(() => {
    return {
      grid: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
      legend: {
        show: true,
        top: 'center',
        right: '0',
        orient: 'vertical',
        icon: 'circle',
        itemWidth: 6,
        itemHeight: 6,
        textStyle: {
          color: '#4E5969',
        },
      },
      tooltip: {
        show: true,
      },
      series: [
        {
          name: '总计',
          type: 'pie',
          radius: ['50%', '70%'],
          label: {
            show: false,
          },
          data,
        },
      ],
    };
  });
  return {
    data,
    chartOption,
  };
};

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  quota: {
    type: String,
    default: '',
  },
  chartType: {
    type: String,
    default: '',
  },
  cardStyle: {
    type: Object as PropType<CSSProperties>,
    default: () => {
      return {};
    },
  },
});

const { loading, setLoading } = useLoading(true);
const { chartOption: lineChartOption, data: lineData } =
  lineChartOptionsFactory();
const { chartOption: barChartOption, data: barData } =
  barChartOptionsFactory();
const { chartOption: pieChartOption, data: pieData } =
  pieChartOptionsFactory();
const renderData = ref<PublicOpinionAnalysisRes>({
  count: 0,
  growth: 0,
  chartData: [],
});
const chartOption = ref({});
const fetchData = async (params: PublicOpinionAnalysis) => {
  try {
    // const { data } = await queryPublicOpinionAnalysis(params);
    const data = {
      "count": 5670,
      "growth": 206.32,
      "chartData": [
        {
          "x": "1月",
          "y": 51,
          "name": "2024"
        },
        {
          "x": "2月",
          "y": 67,
          "name": "2024"
        },
        {
          "x": "3月",
          "y": 10,
          "name": "2024"
        },
        {
          "x": "4月",
          "y": 100,
          "name": "2024"
        },
        {
          "x": "5月",
          "y": 15,
          "name": "2024"
        },
        {
          "x": "6月",
          "y": 76,
          "name": "2024"
        },
        {
          "x": "7月",
          "y": 29,
          "name": "2024"
        },
        {
          "x": "8月",
          "y": 35,
          "name": "2024"
        },
        {
          "x": "9月",
          "y": 62,
          "name": "2024"
        },
        {
          "x": "10月",
          "y": 56,
          "name": "2024"
        },
        {
          "x": "11月",
          "y": 13,
          "name": "2024"
        },
        {
          "x": "12月",
          "y": 20,
          "name": "2024"
        },
        {
          "x": "1月",
          "y": 54,
          "name": "2023"
        },
        {
          "x": "2月",
          "y": 45,
          "name": "2023"
        },
        {
          "x": "3月",
          "y": 59,
          "name": "2023"
        },
        {
          "x": "4月",
          "y": 8,
          "name": "2023"
        },
        {
          "x": "5月",
          "y": 18,
          "name": "2023"
        },
        {
          "x": "6月",
          "y": 80,
          "name": "2023"
        },
        {
          "x": "7月",
          "y": 32,
          "name": "2023"
        },
        {
          "x": "8月",
          "y": 28,
          "name": "2023"
        },
        {
          "x": "9月",
          "y": 11,
          "name": "2023"
        },
        {
          "x": "10月",
          "y": 48,
          "name": "2023"
        },
        {
          "x": "11月",
          "y": 98,
          "name": "2023"
        },
        {
          "x": "12月",
          "y": 12,
          "name": "2023"
        }
      ]
    }

    renderData.value = data;
    const { chartData } = data;
    if (props.chartType === 'bar') {
      chartData.forEach((el, idx) => {
        barData.value.push({
          value: el.y,
          itemStyle: {
            color: idx % 2 ? '#2CAB40' : '#86DF6C',
          },
        });
      });
      chartOption.value = barChartOption.value;
    } else if (props.chartType === 'line') {
      chartData.forEach((el) => {
        if (el.name === '2021') {
          lineData.value[0].push(el.y);
        } else {
          lineData.value[1].push(el.y);
        }
      });
      chartOption.value = lineChartOption.value;
    } else {
      chartData.forEach((el) => {
        pieData.value.push(el);
      });
      chartOption.value = pieChartOption.value;
    }
  } catch (err) {
    // you can report use errorHandler or other
  } finally {
    setLoading(false);
  }
};
fetchData({ quota: props.quota });
</script>

<style scoped lang="less">
:deep(.arco-card) {
  border-radius: 4px;
}

:deep(.arco-card-body) {
  width: 100%;
  height: 134px;
  padding: 0;
}

.content-wrap {
  width: 100%;
  padding: 16px;
  white-space: nowrap;
}

:deep(.content) {
  float: left;
  width: 108px;
  height: 102px;
}

:deep(.arco-statistic) {
  .arco-statistic-title {
    font-size: 16px;
    font-weight: bold;
    white-space: nowrap;
  }

  .arco-statistic-content {
    margin-top: 10px;
  }
}

.chart {
  float: right;
  width: calc(100% - 108px);
  height: 90px;
  vertical-align: bottom;
}

.label {
  padding-right: 8px;
  font-size: 12px;
}
</style>
