<template>
  <a-spin :loading="loading" style="width: 100%">
    <a-card class="general-card" :header-style="{ paddingBottom: '14px' }">
      <template #title>
        {{ $t('dataAnalysis.popularAuthor') }}
      </template>
      <template #extra>
        <a-link>{{ $t('workplace.viewMore') }}</a-link>
      </template>
      <a-table :data="tableData.list" :pagination="false" :bordered="false" style="margin-bottom: 20px"
        :scroll="{ x: '100%', y: '350px' }">
        <template #columns>
          <a-table-column :title="$t('dataAnalysis.popularAuthor.column.ranking')" data-index="ranking">
          </a-table-column>
          <a-table-column :title="$t('dataAnalysis.popularAuthor.column.author')" data-index="author">
          </a-table-column>
          <a-table-column :title="$t('dataAnalysis.popularAuthor.column.content')" data-index="contentCount" :sortable="{
    sortDirections: ['ascend', 'descend'],
  }">
          </a-table-column>
          <a-table-column :title="$t('dataAnalysis.popularAuthor.column.click')" data-index="clickCount" :sortable="{
    sortDirections: ['ascend', 'descend'],
  }">
          </a-table-column>
        </template>
      </a-table>
    </a-card>
  </a-spin>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import useLoading from '@/hooks/loading';
import { queryPopularAuthor, PopularAuthorRes } from '@/api/visualization';

const { loading, setLoading } = useLoading();
const tableData = ref<PopularAuthorRes>({ list: [] });
const fetchData = async () => {
  try {
    setLoading(true);
    // const { data } = await queryPopularAuthor();
    const data = {
      "list": [
        {
          "ranking": 1,
          "author": "易路经京民",
          "contentCount": "8168",
          "clickCount": "5211"
        },
        {
          "ranking": 2,
          "author": "边手技指先",
          "contentCount": "8286",
          "clickCount": "9856"
        },
        {
          "ranking": 3,
          "author": "油资道集西",
          "contentCount": "6645",
          "clickCount": "2424"
        },
        {
          "ranking": 4,
          "author": "类金持不影",
          "contentCount": "2367",
          "clickCount": "6144"
        },
        {
          "ranking": 5,
          "author": "里相各才段",
          "contentCount": "3651",
          "clickCount": "5331"
        },
        {
          "ranking": 6,
          "author": "产文单族段",
          "contentCount": "9226",
          "clickCount": "2685"
        },
        {
          "ranking": 7,
          "author": "复县何具学",
          "contentCount": "2248",
          "clickCount": "8228"
        }
      ]
    }
    console.log(data, 8000000000);

    tableData.value = data;
  } catch (err) {
    // you can report use errorHandler or other
  } finally {
    setLoading(false);
  }
};
fetchData();
</script>

<style scoped lang="less">
.general-card {
  max-height: 425px;
}
</style>
