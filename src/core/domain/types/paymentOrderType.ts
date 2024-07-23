import { PaymentOrderStatusEnum } from '@domain/enums/paymentOrderEnum';

export type PaymentOrderStatusType = keyof typeof PaymentOrderStatusEnum;
