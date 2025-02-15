import { PaymentOrderStatusEnum } from '@src/core/application/enumerations/paymentOrderEnum';

export type PaymentOrderStatusType = keyof typeof PaymentOrderStatusEnum;
