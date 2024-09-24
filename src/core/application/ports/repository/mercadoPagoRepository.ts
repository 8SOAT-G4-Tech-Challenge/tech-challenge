import { CreateQrRequest, CreateQrResponse } from '@models/mercadoPagoQr';

export interface MercadoPagoRepository {
	createQrPayment(request: CreateQrRequest): Promise<CreateQrResponse>;
}
