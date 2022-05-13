import { TodoServicePromiseClient } from "./proto/todo_grpc_web_pb";
import { GetItemsRequest } from "./proto/todo_pb";

const todoServer = new TodoServicePromiseClient("https://grpctodo.dev:8081");

const itemUnwrapper = (item) => ({
  id: item.getId(),
  title: item.getTitle(),
  description: item.getDescription(),
  closed: item.getClosed(),
});

export const getItems = async () => {
    const req = new GetItemsRequest();
    const response = await todoServer.getItems(req, {});

    return response.getItemsList().map((item) => itemUnwrapper(item));
};
