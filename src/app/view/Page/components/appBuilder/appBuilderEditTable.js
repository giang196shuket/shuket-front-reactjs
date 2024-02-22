import { DragDropContext, Draggable, Droppable } from './index'

export const AppBuilderEditTable = ({ detail, handleDragEndCallback }) => {


  const handleDragEnd = (e) => {
    if (!e.destination) return;
    let tempData = Array.from(detail?.sc_detail_data);
    let [source_data] = tempData.splice(e.source.index, 1);
    tempData.splice(e.destination.index, 0, source_data);
    handleDragEndCallback(tempData)
  };
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
    <table className="table table-md">
      <thead>
        <tr>
        <th scope="col"></th>

          <th scope="col">#STT</th>
          <th scope="col">템플릿 종류</th>
          <th scope="col">종류템플릿명사진등록</th>
        </tr>
      </thead>
     
        <Droppable droppableId="droppable-1">
            {(provider) => (
              <tbody
                className="text-capitalize"
                ref={provider.innerRef}
                {...provider.droppableProps}
              >
                {detail?.sc_detail_data && detail.sc_detail_data?.map((item, index) => (
                  <Draggable
                    key={item.templateSEQ}
                    draggableId={`${item.templateSEQ}`}
                    index={index}
                  >
                    {(provider) => (
                      <tr {...provider.draggableProps} ref={provider.innerRef}>
                        <td {...provider.dragHandleProps}> = </td>
                        <td>{item.tmpl_order}</td>
                        <td>{item.tmpl_name}</td>
                        <td>{item.tmpl_template_title}</td>
                      </tr>
                    )}
                  </Draggable>
                ))}
                {provider.placeholder}
              </tbody>
            )}
          </Droppable>
    </table>
    </DragDropContext>
  );
};
