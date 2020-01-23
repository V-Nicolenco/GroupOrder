package org.interlink.grouporder.core.handler;

import org.interlink.grouporder.core.exceptions.BadRequestException;
import org.interlink.grouporder.core.exceptions.ForbiddenException;
import org.interlink.grouporder.core.exceptions.UnprocessableEntityException;
import org.springframework.http.HttpStatus;

class ExceptionsTypes {
    private ExceptionsTypes() {
    }

    public static HttpStatus getStatus(Exception e) {
        if (e instanceof BadRequestException) {
            return HttpStatus.BAD_REQUEST; // Отримання неправильних данних
        } else if (e instanceof ForbiddenException) {
            return HttpStatus.FORBIDDEN; // Запрос прийнятий однак не хочу виконувати його
        }else if (e instanceof ClassNotFoundException) {
            return HttpStatus.NOT_FOUND; // Сервер не може знайти класс
        } else if (e instanceof UnprocessableEntityException) {
            return HttpStatus.UNPROCESSABLE_ENTITY; // Тип і синтаксис правильні, однак, серверу не вдалося опрацювати інструкцію вмісту
        } else {
            return HttpStatus.INTERNAL_SERVER_ERROR; // Непередбачувана умова яка не дозволила виконати запрос
        }
    }
}
