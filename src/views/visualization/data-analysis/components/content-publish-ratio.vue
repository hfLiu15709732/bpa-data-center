<template>
  <a-spin :loading="loading" style="width: 100%">
    <a-card class="general-card" :header-style="{ paddingBottom: '14px' }">
      <template #title>
        {{ $t('dataAnalysis.contentPublishRatio') }}
      </template>
      <template #extra>
        <a-link>{{ $t('workplace.viewMore') }}</a-link>
      </template>
      <Chart style="width: 100%; height: 347px" :option="chartOption" />
    </a-card>
  </a-spin>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { ToolTipFormatterParams } from '@/types/echarts';
import useLoading from '@/hooks/loading';
import {
  queryContentPublish,
  ContentPublishRecord,
  getMockData,
} from '@/api/visualization';
import useChartOption from '@/hooks/chart-option';

const tooltipItemsHtmlString = (items: ToolTipFormatterParams[]) => {
  return items
    .map(
      (el) => `<div class="content-panel">
    <p>
      <span style="background-color: ${el.color
        }" class="tooltip-item-icon"></span>
      <span>
      ${el.seriesName}
      </span>
    </p>
    <span class="tooltip-value">
      ${Number(el.value).toLocaleString()}
    </span>
  </div>`
    )
    .join('');
};

const { loading, setLoading } = useLoading(true);
const xAxis = ref<string[]>([]);
const textChartsData = ref<number[]>([]);
const imgChartsData = ref<number[]>([]);
const videoChartsData = ref<number[]>([]);
const { chartOption } = useChartOption((isDark) => {
  return {
    grid: {
      left: '4%',
      right: 0,
      top: '20',
      bottom: '60',
    },
    legend: {
      bottom: 0,
      icon: 'circle',
      textStyle: {
        color: '#4E5969',
      },
    },
    xAxis: {
      type: 'category',
      data: xAxis.value,
      axisLine: {
        lineStyle: {
          color: isDark ? '#3f3f3f' : '#A9AEB8',
        },
      },
      axisTick: {
        show: true,
        alignWithLabel: true,
        lineStyle: {
          color: '#86909C',
        },
      },
      axisLabel: {
        color: '#86909C',
      },
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: '#86909C',
        formatter(value: number, idx: number) {
          if (idx === 0) return `${value}`;
          return `${value / 1000}k`;
        },
      },
      splitLine: {
        lineStyle: {
          color: isDark ? '#3F3F3F' : '#E5E6EB',
        },
      },
    },
    tooltip: {
      show: true,
      trigger: 'axis',
      formatter(params) {
        const [firstElement] = params as ToolTipFormatterParams[];
        return `<div>
            <p class="tooltip-title">${firstElement.axisValueLabel}</p>
            ${tooltipItemsHtmlString(params as ToolTipFormatterParams[])}
          </div>`;
      },
      className: 'echarts-tooltip-diy',
    },
    series: [
      {
        name: '纯文本',
        data: textChartsData.value,
        stack: 'one',
        type: 'bar',
        barWidth: 16,
        color: isDark ? '#4A7FF7' : '#246EFF',
      },
      {
        name: '图文类',
        data: imgChartsData.value,
        stack: 'one',
        type: 'bar',
        color: isDark ? '#085FEF' : '#00B2FF',
      },
      {
        name: '视频类',
        data: videoChartsData.value,
        stack: 'one',
        type: 'bar',
        color: isDark ? '#01349F' : '#81E2FF',
        itemStyle: {
          borderRadius: 2,
        },
      },
    ],
  };
});
const fetchData = async () => {
  setLoading(true);
  try {
    // const val = await queryContentPublish();
    const val = {
      "data": [
        {
          "name": "纯文本",
          "x": [
            "0:00",
            "2:00",
            "4:00",
            "6:00",
            "8:00",
            "10:00",
            "12:00",
            "14:00",
            "16:00",
            "18:00",
            "20:00",
            "22:00"
          ],
          "y": [
            2912,
            1756,
            1752,
            1326,
            2051,
            2231,
            2532,
            1147,
            2127,
            1266,
            2349,
            2068
          ]
        },
        {
          "name": "图文类",
          "x": [
            "0:00",
            "2:00",
            "4:00",
            "6:00",
            "8:00",
            "10:00",
            "12:00",
            "14:00",
            "16:00",
            "18:00",
            "20:00",
            "22:00"
          ],
          "y": [
            2515,
            2168,
            1041,
            1305,
            1134,
            1427,
            1368,
            2431,
            1429,
            2350,
            1983,
            2473
          ]
        },
        {
          "name": "视频类",
          "x": [
            "0:00",
            "2:00",
            "4:00",
            "6:00",
            "8:00",
            "10:00",
            "12:00",
            "14:00",
            "16:00",
            "18:00",
            "20:00",
            "22:00"
          ],
          "y": [
            2783,
            1712,
            1350,
            1424,
            2860,
            1171,
            1678,
            1932,
            1845,
            2237,
            1635,
            2851
          ]
        }
      ],
      "status": "ok",
      "msg": "请求成功",
      "code": 20000
    }


    // const res2 = await getMockData();
    // console.log(res2, 9999999999);


    const chartData = val.data
    xAxis.value = chartData[0].x;
    chartData.forEach((el: ContentPublishRecord) => {
      if (el.name === '纯文本') {
        textChartsData.value = el.y;
      } else if (el.name === '图文类') {
        imgChartsData.value = el.y;
      }
      videoChartsData.value = el.y;
    });
  } catch (err) {
    // you can report use errorHandler or other
  } finally {
    setLoading(false);
  }
};
fetchData();
</script>

<style scoped lang="less"></style>
