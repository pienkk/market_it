import { Test, TestingModule } from "@nestjs/testing";
import { OrdersService } from "./orders.service";
import { Repository, UpdateResult } from "typeorm";
import { OrderEntity } from "./entities/orders.entity";
import { getRepositoryToken } from "@nestjs/typeorm";
import {
  RequestGetOrderDto,
  RequestOrderStatusChangeDto,
} from "./dtos/request-orders.dto";
import { UserEntity } from "src/users/entities/users.entity";
import { ProductEntity } from "./entities/products.entity";
import { PageNationDto } from "src/common/dtos/common.dto";

describe("OrdersService", () => {
  let orderService: OrdersService;
  let orderRepository: Repository<OrderEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        { provide: getRepositoryToken(OrderEntity), useClass: Repository },
        { provide: getRepositoryToken(UserEntity), useClass: Repository },
      ],
    }).compile();

    orderService = module.get<OrdersService>(OrdersService);
    orderRepository = module.get<Repository<OrderEntity>>(
      getRepositoryToken(OrderEntity),
    );
  });

  describe("acceptOrder() 주문 접수 처리", () => {
    const requestOrderStatusChangeDto: RequestOrderStatusChangeDto = {
      orderIdx: "0646ebe1-4e17-49ca-b871-99770050a9d1",
    };

    // 성공
    it("주문 접수 처리를 완료한뒤 '주문 접수 처리 완료' 메시지를 반환한다.", async () => {
      const order = new OrderEntity();
      const existingOrder: Partial<OrderEntity> = {
        orderIdx: "0646ebe1-4e17-49ca-b871-99770050a9d1",
        quantity: 1,
        price: 5,
        status: "ORDER_PENDING",
      };
      Object.assign(order, existingOrder);
      const updateResult: UpdateResult = {
        raw: [],
        affected: 1,
        generatedMaps: [],
      };

      jest.spyOn(orderRepository, "findOne").mockResolvedValue(order);
      jest.spyOn(orderRepository, "update").mockResolvedValue(updateResult);

      const result = await orderService.acceptOrder(
        requestOrderStatusChangeDto,
      );

      expect(result).toBe("주문 접수 처리 완료");
    });

    // 실패
    it("주문이 존재하지 않을 경우 '해당 주문이 존재하지 않습니다.' 에러를 반환한다", async () => {
      jest.spyOn(orderRepository, "findOne").mockResolvedValue(undefined);

      try {
        await orderService.acceptOrder(requestOrderStatusChangeDto);
      } catch (error) {
        expect(error.message).toBe("해당 주문이 존재하지 않습니다.");
      }
    });

    // 실패
    it("주문 상태가 주문 대기 상태가 아닐 경우 '주문 대기 상태의 주문만 접수할 수 있습니다.' 에러를 반환한다", async () => {
      const order = new OrderEntity();
      const existingOrder: Partial<OrderEntity> = {
        orderIdx: "0646ebe1-4e17-49ca-b871-99770050a9d1",
        quantity: 1,
        price: 5,
        status: "ORDER_ACCEPTED",
      };
      Object.assign(order, existingOrder);

      jest.spyOn(orderRepository, "findOne").mockResolvedValue(order);

      try {
        await orderService.acceptOrder(requestOrderStatusChangeDto);
      } catch (error) {
        expect(error.message).toBe(
          "주문 대기 상태의 주문만 접수할 수 있습니다.",
        );
      }
    });
  });

  describe("completeOrder() 주문 완료 처리", () => {
    const requestOrderStatusChangeDto: RequestOrderStatusChangeDto = {
      orderIdx: "7b86171c-a8ec-4e52-b2fb-7c037432b5d1",
    };

    // 성공
    it("주문 완료 처리를 완료한뒤 '주문 완료 처리 완료' 메시지를 반환한다.", async () => {
      const order = new OrderEntity();
      const existingOrder: Partial<OrderEntity> = {
        orderIdx: "7b86171c-a8ec-4e52-b2fb-7c037432b5d1",
        quantity: 1,
        price: 50000,
        status: "ORDER_ACCEPTED",
      };
      Object.assign(order, existingOrder);
      const updateResult: UpdateResult = {
        raw: [],
        affected: 1,
        generatedMaps: [],
      };

      jest.spyOn(orderRepository, "findOne").mockResolvedValue(order);
      jest.spyOn(orderRepository, "update").mockResolvedValue(updateResult);

      const result = await orderService.completeOrder(
        requestOrderStatusChangeDto,
      );

      expect(result).toBe("주문 완료 처리 완료");
    });

    // 실패
    it("주문이 존재하지 않을 경우 '해당 주문이 존재하지 않습니다.' 에러를 반환한다", async () => {
      jest.spyOn(orderRepository, "findOne").mockResolvedValue(undefined);

      try {
        await orderService.completeOrder(requestOrderStatusChangeDto);
      } catch (error) {
        expect(error.message).toBe("해당 주문이 존재하지 않습니다.");
      }
    });

    // 실패
    it("주문 상태가 주문 접수 상태가 아닐 경우 '주문 접수 상태의 주문만 완료할 수 있습니다.' 에러를 반환한다", async () => {
      const order = new OrderEntity();
      const existingOrder: Partial<OrderEntity> = {
        orderIdx: "7b86171c-a8ec-4e52-b2fb-7c037432b5d1",
        quantity: 1,
        price: 50000,
        status: "ORDER_PENDING",
      };
      Object.assign(order, existingOrder);

      jest.spyOn(orderRepository, "findOne").mockResolvedValue(order);

      try {
        await orderService.completeOrder(requestOrderStatusChangeDto);
      } catch (error) {
        expect(error.message).toBe(
          "주문 접수 상태의 주문만 완료할 수 있습니다.",
        );
      }
    });
  });

  describe("getOrder() 단일 주문 조회 ", () => {
    const requestGetOrderDto: RequestGetOrderDto = {
      orderIdx: "02bb5488-8174-4472-9dab-c8c1f46a9050",
    };

    // 성공
    it("주문 조회에 성공하면 주문 정보를 반환한다.", async () => {
      const user = new UserEntity();
      const existingUser: Partial<UserEntity> = {
        name: "장기석",
      };
      Object.assign(user, existingUser);
      const product = new ProductEntity();
      const existingProduct: Partial<ProductEntity> = {
        productIdx: "31a898d5-34cb-439e-a4a1-6d8e93e69b70",
        name: "아메리카노",
        description: "깊고 진한 맛",
        price: 50000,
      };
      Object.assign(product, existingProduct);
      const order = new OrderEntity();
      const existingOrder: Partial<OrderEntity> = {
        orderIdx: "02bb5488-8174-4472-9dab-c8c1f46a9050",
        quantity: 1,
        price: 50000,
        status: "ORDER_ACCEPTED",
        createdAt: new Date("2023-06-15"),
        user: user,
        product: product,
      };
      Object.assign(order, existingOrder);

      jest.spyOn(orderRepository, "findOne").mockResolvedValue(order);

      const result = await orderService.getOrder(requestGetOrderDto);

      expect(result).toEqual({
        orderIdx: "02bb5488-8174-4472-9dab-c8c1f46a9050",
        quantity: 1,
        price: 50000,
        status: "ORDER_ACCEPTED",
        createdAt: new Date("2023-06-15"),
        user: {
          name: "장기석",
        },
        product: {
          productIdx: "31a898d5-34cb-439e-a4a1-6d8e93e69b70",
          name: "아메리카노",
          description: "깊고 진한 맛",
          price: 50000,
        },
      });
    });

    // 실패
    it("주문이 존재하지 않을 경우 '해당 주문이 존재하지 않습니다.' 에러를 반환한다", async () => {
      jest.spyOn(orderRepository, "findOne").mockResolvedValue(undefined);

      try {
        await orderService.getOrder(requestGetOrderDto);
      } catch (error) {
        expect(error.message).toBe("해당 주문이 존재하지 않습니다.");
      }
    });
  });

  describe("getOrdersPageNation() 주문 목록 조회", () => {
    const pageNationDto: PageNationDto = {
      page: 1,
      limit: 10,
    };

    // 성공
    it("주문 목록과 조건에 맞는 주문 갯수를 반환한다.", async () => {
      const user = new UserEntity();
      const existingUser: Partial<UserEntity> = {
        name: "장기석",
      };
      Object.assign(user, existingUser);
      const product = new ProductEntity();
      const existingProduct: Partial<ProductEntity> = {
        productIdx: "31a898d5-34cb-439e-a4a1-6d8e93e69b70",
        name: "아메리카노",
        description: "깊고 진한 맛",
        price: 50000,
      };
      Object.assign(product, existingProduct);
      const firstOrder = new OrderEntity();
      const existingOrder: Partial<OrderEntity> = {
        orderIdx: "02bb5488-8174-4472-9dab-c8c1f46a9050",
        quantity: 1,
        price: 50000,
        status: "ORDER_ACCEPTED",
        createdAt: new Date("2023-06-15"),
        user: user,
        product: product,
      };
      Object.assign(firstOrder, existingOrder);
      const secondOrder = new OrderEntity();
      const existingSecondOrder: Partial<OrderEntity> = {
        orderIdx: "02bb5488-8174-4472-9dab-c8c1f46a9055",
        quantity: 1,
        price: 50000,
        status: "ORDER_ACCEPTED",
        createdAt: new Date("2023-06-15"),
        user: user,
        product: product,
      };
      Object.assign(secondOrder, existingSecondOrder);

      const orderList = [firstOrder, secondOrder];
      const orderCount = 2;

      jest
        .spyOn(orderRepository, "findAndCount")
        .mockResolvedValue([orderList, orderCount]);

      const result = await orderService.getOrdersPageNation(pageNationDto);

      expect(result).toEqual({
        orders: [
          {
            orderIdx: "02bb5488-8174-4472-9dab-c8c1f46a9050",
            quantity: 1,
            price: 50000,
            status: "ORDER_ACCEPTED",
            createdAt: new Date("2023-06-15"),
            user: {
              name: "장기석",
            },
            product: {
              productIdx: "31a898d5-34cb-439e-a4a1-6d8e93e69b70",
              name: "아메리카노",
              description: "깊고 진한 맛",
              price: 50000,
            },
          },
          {
            orderIdx: "02bb5488-8174-4472-9dab-c8c1f46a9055",
            quantity: 1,
            price: 50000,
            status: "ORDER_ACCEPTED",
            createdAt: new Date("2023-06-15"),
            user: {
              name: "장기석",
            },
            product: {
              productIdx: "31a898d5-34cb-439e-a4a1-6d8e93e69b70",
              name: "아메리카노",
              description: "깊고 진한 맛",
              price: 50000,
            },
          },
        ],
        total: 2,
      });
    });
  });
});
