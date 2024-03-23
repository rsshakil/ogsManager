import { Outlet } from "react-router-dom";
import DataGrid, {
    Column,
    Lookup,
    FilterRow,
    Paging,
    Pager,
    Sorting,
    Scrolling,
    LoadPanel,
    RemoteOperations,
} from 'devextreme-react/data-grid';
import Loader from "../atoms/Loading/TherapistLoader";
import { Footer } from "../organisms/Footer";


const lookupDataSourceConfig = {
    store: {
        type: 'array',
        data: [],
        key: 'id'
    },
    pageSize: 10,
    paginate: true
}

const statusLookupConfig = {
    ...lookupDataSourceConfig,
    store: {
        ...lookupDataSourceConfig.store,
        data: [
            { id: 1, name: '有効' },
            { id: 2, name: '無効' },
        ]
    }
}

const shippingRestrictionLookupConfig = {
    ...lookupDataSourceConfig,
    store: {
        ...lookupDataSourceConfig.store,
        data: [
            { id: 0, name: 'あり' },
            { id: 1, name: 'なし' },
        ]
    }
}

export default function TableLayout() {


    const customTemplatePriceSurvey = (data) => {
        const { displayValue: itemName } = data || {};

        return (
            <div className="flex space-x-3">
                <a href={`https://auctions.yahoo.co.jp/search/search?is_postage_mode=1&dest_pref_code=13&exflg=1&b=1&n=100&s1=tbids&o1=d&mode=2&brand_id=167473&p=${itemName}&va=${itemName}`} target="_blank">①</a>
                <a href={`https://grading.pokeca-chart.com/search-result/?search_word=${itemName}`} target="_blank">②</a>
                <a href={`https://pokeca-chart.com/search-result/?search_word=${itemName}`} target="_blank">③</a>
                <a href={`https://pokeka-atari.jp/search?keyword=${itemName}`} target="_blank">④</a>
            </div>
        );
    }

    return (
        <>
            {/* {<Loader />} */}
            <DataGrid
                noDataText=""
                id="gridContainer"
                dataSource={[]}
                columnAutoWidth={true}
                height="100%"
                rowAlternationEnabled={true}
                hoverStateEnabled={true}
                showBorders={false}
                showRowLines={false}
            // onContentReady={(e) => (setContentReady(true))}

            // remoteOperations={{ filtering: true, sorting: true }}
            >
                <Column
                    caption="状態"
                    filterValues={[1, 2]}
                    dataField="itemStatus"
                    alignment="center"
                    width={60}
                >
                    <Lookup
                        dataSource={statusLookupConfig}
                        valueExpr="id"
                        displayExpr="name"
                    />
                </Column>
                <Column
                    caption="ID"
                    dataField="itemUUID"
                    width={80}
                    headerCellRender={({ column: { width, caption } = {} }) => (<div style={{ textAlign: 'center', width: `${width}px` }}>{caption}</div>)}
                />
                <Column
                    caption="カテゴリー"
                    dataField="categoryName"
                    width={120}
                    headerCellRender={({ column: { width, caption } = {} }) => (<div style={{ textAlign: 'center', width: `${width}px` }}>{caption}</div>)}
                />
                <Column
                    caption="タグ"
                    dataField="tagName"
                    width={200}
                    headerCellRender={({ column: { width, caption } = {} }) => (<div style={{ textAlign: 'center', width: `${width}px` }}>{caption}</div>)}
                />
                <Column
                    caption="価格調査"
                    dataField="itemName"
                    width={200}
                    headerCellRender={({ column: { width, caption } = {} }) => (<div style={{ textAlign: 'center', width: `${width}px` }}>{caption}</div>)}
                    cellRender={customTemplatePriceSurvey}
                />
                <Column
                    caption="アイテム名[日本語]"
                    dataField="itemName"
                    width={400}
                    headerCellRender={({ column: { width, caption } = {} }) => (<div style={{ textAlign: 'center', width: `${width}px` }}>{caption}</div>)}
                />
                <Column
                    caption="発送制限"
                    dataField="itemShippingFlag"
                    width={80}
                    alignment="center"
                >
                    <Lookup
                        dataSource={shippingRestrictionLookupConfig}
                        valueExpr="id"
                        displayExpr="name"
                    />
                </Column>
                <Column
                    caption="編集日時"
                    dataField="itemUpdatedAt"
                    dataType="date"
                    format="yyyy/MM/dd HH:mm"
                    alignment="center"
                    width={240}
                />
                <Column
                    caption="登録日時"
                    dataField="itemCreatedAt"
                    dataType="date"
                    format="yyyy/MM/dd HH:mm"
                    alignment="center"
                    width={240}
                />
                <Column
                    caption="未使用数"
                    dataField="itemStockUnsetCount"
                    dataType="number"
                    alignment="right"
                    width={100}
                    headerCellRender={({ column: { width, caption } = {} }) => (<div style={{ textAlign: 'center', width: `${width}px` }}>{caption}</div>)}
                />
                <Column
                    caption="セット数"
                    dataField="itemStockGachaCount"
                    dataType="number"
                    alignment="right"
                    width={100}
                    headerCellRender={({ column: { width, caption } = {} }) => (<div style={{ textAlign: 'center', width: `${width}px` }}>{caption}</div>)}
                />
                <Column
                    caption="所蔵数"
                    dataField="itemStockCollectionCount"
                    dataType="number"
                    alignment="right"
                    width={100}
                    headerCellRender={({ column: { width, caption } = {} }) => (<div style={{ textAlign: 'center', width: `${width}px` }}>{caption}</div>)}
                />
                <Column
                    caption="発送"
                    dataField="itemStockShippingRequestCount"
                    dataType="number"
                    alignment="right"
                    width={100}
                    headerCellRender={({ column: { width, caption } = {} }) => (<div style={{ textAlign: 'center', width: `${width}px` }}>{caption}</div>)}
                />

                <Column
                    type="buttons"
                    caption="複製"
                    dataField="duplicateAction"
                    alignment="center"
                    width={60}
                >
                    {/* <Button cssClass="cursor-pointer" >
                        <CloneIcon classNames="inline fill-white " />
                    </Button> */}
                </Column>

                <Column
                    type="buttons"
                    caption="編集"
                    dataField="editAction"
                    alignment="center"
                    width={60}
                >
                    {/* <Button cssClass="cursor-pointer">
                        <EditIcon classNames="inline fill-white" />
                    </Button> */}
                </Column>

                {/* <Outlet /> */}
            </DataGrid>

            <Footer />
        </>
    )
}