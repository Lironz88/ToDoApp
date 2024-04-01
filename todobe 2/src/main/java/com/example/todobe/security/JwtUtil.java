package com.example.todobe.security;

import com.example.todobe.beans.UserDetails;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.*;

@Component
public class JwtUtil {
    private Key decodedSecretKey;

    @PostConstruct
    public void init() {
        String secretKey = "Lesh+Lesha+MyLife+cant+wait+for+a+job";
        byte[] keyBytes = Base64.getEncoder().encode(secretKey.getBytes());
        this.decodedSecretKey = Keys.hmacShaKeyFor(keyBytes);
    }

    public String generateTokenWithId(UserDetails userDetails, Integer id) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("userEmail", userDetails.getEmail());
        claims.put("id", id.toString()); // Directly use the integer ID, assuming it's always provided
        return "Bearer " + createToken(claims, userDetails.getUserType().toString());
    }

    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("userEmail", userDetails.getEmail());
        return "Bearer " + createToken(claims, userDetails.getUserType().toString());
    }

    private String createToken(Map<String, Object> claims, String subject) {
        Instant now = Instant.now();
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(Date.from(now))
                .setExpiration(Date.from(now.plus(30, ChronoUnit.MINUTES)))
                .signWith(decodedSecretKey, SignatureAlgorithm.HS256)
                .compact();
    }

    public Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(decodedSecretKey)
                .build()
                .parseClaimsJws(token.replace("Bearer ", ""))
                .getBody();
    }

    // This method assumes the 'id' is stored as a String in the token
    public Integer getIdFromToken(String token) {
        String idStr = extractAllClaims(token).get("id", String.class);
        return Integer.valueOf(idStr);
    }
}