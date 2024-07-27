ALTER TABLE "order" 
ADD CONSTRAINT status_check 
CHECK (status IN ('created', 'received', 'preparation', 'ready', 'finished', 'canceled'));

ALTER TABLE "payment_order"
ADD CONSTRAINT status_check 
CHECK (status IN ('pending', 'paid', 'canceled'));