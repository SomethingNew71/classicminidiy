<script lang="ts" setup>
  const { t } = useI18n({
    useScope: 'local',
  });
  import { chartOptions, type Needle, type NeedleResponse } from '../../../data/models/needles';

  // Fetch needles data
  const { data: needles, pending }: any = await useFetch(() => '/api/needles/list');

  // Reactive chart options
  const reactiveChartOptions = ref(chartOptions);
  const allNeedles = ref<NeedleResponse>(needles);
  const selectedNeedles = ref<Needle[]>(needles?.value?.initial ? [...needles.value.initial] : []);
  const alreadyExistsError = ref(false);
  const emptyError = ref(false);
  const addNeedleValue: any = ref();

  // DaisyUI specific reactive properties
  const searchText = ref('');

  function updateArrayItem() {
    reactiveChartOptions.value.series = selectedNeedles.value;
  }

  function addArrayItem() {
    alreadyExistsError.value = selectedNeedles.value.some((obj: Needle) => obj.name === addNeedleValue.value?.name);
    emptyError.value = !addNeedleValue.value;
    if (alreadyExistsError.value) {
      window.setTimeout(() => (alreadyExistsError.value = false), 5000);
    } else if (emptyError.value) {
      window.setTimeout(() => (emptyError.value = false), 5000);
    } else {
      selectedNeedles.value.push(addNeedleValue.value as Needle);
      addNeedleValue.value = null;
      searchText.value = '';
      updateArrayItem();
    }
  }

  function removeArrayItem(currentItem: Needle) {
    // Find the index of the item you want to remove
    const itemIndex = selectedNeedles.value.indexOf(currentItem);
    // Remove the specific needle value which automatically triggers a redraw
    selectedNeedles.value.splice(itemIndex, 1);
    updateArrayItem();
  }

  // Watch for changes in needles data and update selectedNeedles
  watch(needles, (newNeedles) => {
    allNeedles.value = newNeedles;
    selectedNeedles.value = newNeedles?.initial ? [...newNeedles.initial] : [];
    updateArrayItem();
  });
</script>

<template>
  <div class="grid grid-cols-12 gap-3 configurator-component">
    <div class="col-span-12 md:col-span-4">
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h3 class="fancy-font-bold text-xl pb-3">{{ t('title') }}</h3>
          <p class="pb-3">
            {{ t('description') }}
          </p>
          <!-- Modal dialog for diagram -->
          <div>
            <button class="btn btn-sm btn-neutral mb-5" onclick="diagram_modal.showModal()">
              {{ t('diagram_button') }}
            </button>
            <dialog id="diagram_modal" class="modal">
              <div class="modal-box w-11/12 max-w-5xl">
                <h3 class="font-bold text-lg">{{ t('diagram_modal.title') }}</h3>
                <img
                  loading="lazy"
                  class="diagram mx-auto"
                  src="https://classicminidiy.s3.us-east-1.amazonaws.com/misc/diagram.jpg"
                  :alt="t('diagram_modal.alt_text')"
                />
                <div class="modal-action">
                  <form method="dialog">
                    <button class="btn btn-primary">
                      {{ t('diagram_modal.close_button') }}
                    </button>
                  </form>
                </div>
              </div>
            </dialog>
          </div>

          <template v-if="pending">
            <!-- Loading state -->
            <div class="skeleton h-32 w-full"></div>
          </template>
          <template v-else-if="allNeedles && selectedNeedles">
            <!-- Needle selection dropdown -->
            <div class="form-control w-full">
              <select class="select select-bordered w-full" v-model="addNeedleValue">
                <option :value="null" disabled selected>
                  {{ t('form.select_placeholder') }}
                </option>
                <option v-for="needle in allNeedles.all" :key="needle.name" :value="needle">
                  {{ needle.name }}
                </option>
              </select>
            </div>

            <!-- Alerts -->
            <div v-if="alreadyExistsError" class="alert alert-info mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="stroke-current shrink-0 w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>{{ t('alerts.already_exists') }}</span>
            </div>
            <div v-if="emptyError" class="alert alert-info mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="stroke-current shrink-0 w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>{{ t('alerts.empty_selection') }}</span>
            </div>

            <!-- Add needle button -->
            <button class="btn btn-primary mt-2" @click="addArrayItem()">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              {{ t('form.add_button') }}
            </button>

            <div class="divider"></div>

            <h3 class="text-lg font-medium">{{ t('selected_needles_title') }}</h3>
            <div v-if="selectedNeedles" class="flex flex-wrap gap-2 mt-3">
              <div
                v-for="(needle, index) in selectedNeedles"
                :key="index"
                class="badge badge-lg gap-1"
                :class="{ 'badge-neutral': selectedNeedles.length === 1, 'badge-primary': selectedNeedles.length > 1 }"
              >
                <span>{{ needle.name }}</span>
                <button
                  v-if="selectedNeedles.length > 1"
                  @click="removeArrayItem(selectedNeedles[index] as Needle)"
                  class="btn btn-xs btn-circle btn-ghost"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
    <div class="col-span-12 md:col-span-8">
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body p-2">
          <ClientOnly fallback-tag="span">
            <highcharts ref="needlesChart" :options="reactiveChartOptions"></highcharts>
            <template #fallback>
              <p class="p-10 text-center text-xl">{{ t('chart.loading') }}</p>
            </template>
          </ClientOnly>
        </div>
      </div>
    </div>
  </div>
</template>

<i18n lang="json">
{
  "en": {
    "title": "Add a Needle To Compare",
    "description": "Start typing the name of the needles you would like to compare. Unsure of what the graph values mean? Check out the needle diagram below to learn more.",
    "diagram_button": "Helpful diagram",
    "diagram_modal": {
      "title": "Diagram of Needle Measurements",
      "alt_text": "Diagram of Needle Measurements",
      "close_button": "Close"
    },
    "form": {
      "select_placeholder": "Select a needle",
      "add_button": "Add Needle"
    },
    "alerts": {
      "already_exists": "Needle already exists in your list",
      "empty_selection": "You must select another needle to add before clicking add."
    },
    "selected_needles_title": "Currently selected Needles",
    "chart": {
      "loading": "Chart is loading"
    }
  },
  "es": {
    "title": "Agregar una Aguja para Comparar",
    "description": "Comienza escribiendo el nombre de las agujas que te gustaría comparar. ¿No estás seguro de lo que significan los valores del gráfico? Revisa el diagrama de agujas abajo para aprender más.",
    "diagram_button": "Diagrama útil",
    "diagram_modal": {
      "title": "Diagrama de Medidas de Agujas",
      "alt_text": "Diagrama de Medidas de Agujas",
      "close_button": "Cerrar"
    },
    "form": {
      "select_placeholder": "Seleccionar una aguja",
      "add_button": "Agregar Aguja"
    },
    "alerts": {
      "already_exists": "La aguja ya existe en tu lista",
      "empty_selection": "Debes seleccionar otra aguja para agregar antes de hacer clic en agregar."
    },
    "selected_needles_title": "Agujas Actualmente Seleccionadas",
    "chart": {
      "loading": "El gráfico está cargando"
    }
  },
  "fr": {
    "title": "Ajouter une aiguille à comparer",
    "description": "Commencez à taper le nom des aiguilles que vous souhaitez comparer. Vous n'êtes pas sûr de ce que signifient les valeurs du graphique ? Consultez le diagramme des aiguilles ci-dessous pour en savoir plus.",
    "diagram_button": "Diagramme utile",
    "diagram_modal": {
      "title": "Diagramme des mesures d'aiguilles",
      "alt_text": "Diagramme des mesures d'aiguilles",
      "close_button": "Fermer"
    },
    "form": {
      "select_placeholder": "Sélectionner une aiguille",
      "add_button": "Ajouter une aiguille"
    },
    "alerts": {
      "already_exists": "L'aiguille existe déjà dans votre liste",
      "empty_selection": "Vous devez sélectionner une autre aiguille à ajouter avant de cliquer sur ajouter."
    },
    "selected_needles_title": "Aiguilles actuellement sélectionnées",
    "chart": {
      "loading": "Le graphique se charge"
    }
  },
  "de": {
    "title": "Eine Nadel zum Vergleichen hinzufügen",
    "description": "Beginnen Sie mit der Eingabe des Namens der Nadeln, die Sie vergleichen möchten. Unsicher, was die Diagrammwerte bedeuten? Schauen Sie sich das Nadeldiagramm unten an, um mehr zu erfahren.",
    "diagram_button": "Hilfreiches Diagramm",
    "diagram_modal": {
      "title": "Diagramm der Nadelmessungen",
      "alt_text": "Diagramm der Nadelmessungen",
      "close_button": "Schließen"
    },
    "form": {
      "select_placeholder": "Eine Nadel auswählen",
      "add_button": "Nadel hinzufügen"
    },
    "alerts": {
      "already_exists": "Nadel existiert bereits in Ihrer Liste",
      "empty_selection": "Sie müssen eine andere Nadel auswählen, bevor Sie auf Hinzufügen klicken."
    },
    "selected_needles_title": "Aktuell ausgewählte Nadeln",
    "chart": {
      "loading": "Diagramm lädt"
    }
  },
  "it": {
    "title": "Aggiungi un ago da confrontare",
    "description": "Inizia digitando il nome degli aghi che vorresti confrontare. Non sei sicuro di cosa significhino i valori del grafico? Guarda il diagramma dell'ago qui sotto per saperne di più.",
    "diagram_button": "Diagramma utile",
    "diagram_modal": {
      "title": "Diagramma delle misure dell'ago",
      "alt_text": "Diagramma delle misure dell'ago",
      "close_button": "Chiudi"
    },
    "form": {
      "select_placeholder": "Seleziona un ago",
      "add_button": "Aggiungi ago"
    },
    "alerts": {
      "already_exists": "L'ago esiste già nella tua lista",
      "empty_selection": "Devi selezionare un altro ago da aggiungere prima di fare clic su aggiungi."
    },
    "selected_needles_title": "Aghi attualmente selezionati",
    "chart": {
      "loading": "Il grafico si sta caricando"
    }
  },
  "ja": {
    "title": "比較するニードルを追加",
    "description": "比較したいニードルの名前を入力し始めてください。グラフの値が何を意味するかわからない？詳しく学ぶには下のニードル図を確認してください。",
    "diagram_button": "役立つ図表",
    "diagram_modal": {
      "title": "ニードル測定の図表",
      "alt_text": "ニードル測定の図表",
      "close_button": "閉じる"
    },
    "form": {
      "select_placeholder": "ニードルを選択",
      "add_button": "ニードルを追加"
    },
    "alerts": {
      "already_exists": "ニードルはすでにリストに存在します",
      "empty_selection": "追加をクリックする前に別のニードルを選択する必要があります。"
    },
    "selected_needles_title": "現在選択されているニードル",
    "chart": {
      "loading": "チャートを読み込み中"
    }
  },
  "ko": {
    "title": "비교할 니들 추가",
    "description": "비교하고 싶은 니들의 이름을 입력하기 시작하세요. 그래프 값이 무엇을 의미하는지 확실하지 않다면? 아래 니들 다이어그램을 확인하여 자세히 알아보세요.",
    "diagram_button": "도움이 되는 다이어그램",
    "diagram_modal": {
      "title": "니들 측정 다이어그램",
      "alt_text": "니들 측정 다이어그램",
      "close_button": "닫기"
    },
    "form": {
      "select_placeholder": "니들 선택",
      "add_button": "니들 추가"
    },
    "alerts": {
      "already_exists": "니들이 이미 목록에 있습니다",
      "empty_selection": "추가를 클릭하기 전에 다른 니들을 선택해야 합니다."
    },
    "selected_needles_title": "현재 선택된 니들",
    "chart": {
      "loading": "차트 로딩 중"
    }
  },
  "pt": {
    "title": "Adicionar uma Agulha para Comparar",
    "description": "Comece digitando o nome das agulhas que você gostaria de comparar. Não tem certeza do que os valores do gráfico significam? Confira o diagrama da agulha abaixo para saber mais.",
    "diagram_button": "Diagrama útil",
    "diagram_modal": {
      "title": "Diagrama das Medidas da Agulha",
      "alt_text": "Diagrama das Medidas da Agulha",
      "close_button": "Fechar"
    },
    "form": {
      "select_placeholder": "Selecionar uma agulha",
      "add_button": "Adicionar Agulha"
    },
    "alerts": {
      "already_exists": "A agulha já existe na sua lista",
      "empty_selection": "Você deve selecionar outra agulha para adicionar antes de clicar em adicionar."
    },
    "selected_needles_title": "Agulhas Atualmente Selecionadas",
    "chart": {
      "loading": "O gráfico está carregando"
    }
  },
  "ru": {
    "title": "Добавить иглу для сравнения",
    "description": "Начните вводить название игл, которые вы хотели бы сравнить. Не уверены, что означают значения графика? Посмотрите диаграмму иглы ниже, чтобы узнать больше.",
    "diagram_button": "Полезная диаграмма",
    "diagram_modal": {
      "title": "Диаграмма измерений иглы",
      "alt_text": "Диаграмма измерений иглы",
      "close_button": "Закрыть"
    },
    "form": {
      "select_placeholder": "Выберите иглу",
      "add_button": "Добавить иглу"
    },
    "alerts": {
      "already_exists": "Игла уже существует в вашем списке",
      "empty_selection": "Вы должны выбрать другую иглу для добавления перед нажатием добавить."
    },
    "selected_needles_title": "Текущие выбранные иглы",
    "chart": {
      "loading": "График загружается"
    }
  },
  "zh": {
    "title": "添加要比较的针",
    "description": "开始输入您想要比较的针的名称。不确定图表值的含义？查看下面的针图表以了解更多信息。",
    "diagram_button": "有用的图表",
    "diagram_modal": {
      "title": "针测量图表",
      "alt_text": "针测量图表",
      "close_button": "关闭"
    },
    "form": {
      "select_placeholder": "选择一个针",
      "add_button": "添加针"
    },
    "alerts": {
      "already_exists": "针已存在于您的列表中",
      "empty_selection": "您必须在点击添加之前选择另一个针来添加。"
    },
    "selected_needles_title": "当前选择的针",
    "chart": {
      "loading": "图表加载中"
    }
  }
}
</i18n>

<style lang="scss" scoped>
  .diagram {
    max-height: 600px;
    width: auto;
    margin: auto;
    display: inline-block;
  }
</style>

<style lang="scss">
  .highcharts-credits {
    display: none !important;
  }
</style>
