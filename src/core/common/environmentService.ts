export class EnvironmentService {
	getMercadoPagoToken(): string {
		const token = process.env.MERCADO_PAGO_TOKEN;
		if (!token) {
			throw new Error('Mercado Pago token is not defined.');
		}
		return token;
	}

	getMercadoPagoUserId(): number {
		const userId = process.env.MERCADO_PAGO_USER_ID;
		if (!userId) {
			throw new Error('Mercado Pago user ID is not defined.');
		}
		return parseInt(userId, 10);
	}

	getMercadoPagoExternalPosId(): string {
		const posId = process.env.MERCADO_PAGO_EXTERNAL_POS_ID;
		if (!posId) {
			throw new Error('Mercado Pago external POS ID is not defined.');
		}
		return posId;
	}
}
