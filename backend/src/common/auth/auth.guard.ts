import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

import { TokenService } from '../../tokens/token.service';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const autorizationHeader = request.headers.authorization;
    if (!autorizationHeader) new UnauthorizedException({ message: 'User is not authorized' });

    const [bearer, accessToken] = autorizationHeader.split(' ');
    if (bearer !== 'Bearer' || !accessToken) new UnauthorizedException({ message: 'User is not authorized' });

    const user = this.tokenService.validateAccessToken(accessToken);
    if (!user) new UnauthorizedException({ message: 'User is not authorized' });

    request.user = user;

    return true;
  }

  constructor(private tokenService: TokenService, private jwtService: JwtService) {}
}
